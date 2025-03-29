class Payment < ApplicationRecord
  # Validations to ensure data integrity
  validates :transaction_id, presence: true, uniqueness: true
  validates :transaction_amount, presence: true, numericality: { greater_than: 0 }
  validates :bill_ref_number, :msisdn, :transaction_type, :payment_date, :short_code, :status, presence: true

  # After a payment record is created, update the landlord's wallet
  after_create :credit_landlord_wallet

  # After a payment is received broadcast this payment
  after_create_commit :broadcast_payment

  # After a successful payment, trigger sms notification to both the tenant and msisdn
  after_create_commit :enqueue_sms_notification

  private

  def credit_landlord_wallet
    # 1) Find the property using property_uid
    property = Property.find_by(property_uid: property_uid)

    return unless property && property.admin && property.admin.wallet

    # credit the tenantHouseAgreement balance

    # 2) Find the correct house by house_number
    house_obj = property.houses.find_by(house_number: house_number)
    if house_obj
      agreement = TenantHouseAgreement.where(
        house_id: house_obj.id,
        property_id: house_obj.property_id,
        status: 'active'
      ).first

      # 4) Credit the agreement if found
      agreement.credit!(transaction_amount) if agreement
    end

    # 5) Also credit the Admin’s wallet + ledger

    wallet = property.admin.wallet
    wallet.with_lock do
      wallet.credit!(transaction_amount)

      # Create a ledger entry for the deposit
      LedgerEntry.create!(
        admin: property.admin,
        wallet: wallet,
        transaction_type: 'deposit',
        amount: transaction_amount,
        balance_after: wallet.balance,
        description: "Rent payment received (Payment ID: #{transaction_id})"
      )
    end
  rescue StandardError => e
    Rails.logger.error "Failed to credit wallet: #{e.message}"
  end

  def broadcast_payment
    if (property = Property.find_by(property_uid: property_uid)) && property.admin
      PaymentsChannel.broadcast_to(property.admin, payment: as_json)
    end
  rescue StandardError => e
    Rails.logger.error "Failed to broadcast payment: #{e.message}"
  end

  def enqueue_sms_notification
    PaymentSmsJob.perform_later(id)
  end
end
