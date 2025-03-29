class Payment < ApplicationRecord
  # Validations to ensure data integrity
  validates :transaction_id, presence: true, uniqueness: true
  validates :transaction_amount, presence: true, numericality: { greater_than: 0 }
  validates :bill_ref_number, :msisdn, :transaction_type, :payment_date, :short_code, :status, presence: true

  # After a payment record is created, update the landlord's wallet
  after_create :credit_landlord_wallet

  # After a payment is received, broadcast this payment
  after_create_commit :broadcast_payment

  # After a successful payment, trigger SMS notification to both the tenant and msisdn
  after_create_commit :enqueue_sms_notification

  private

  def credit_landlord_wallet
    # Find the property using property_id (the actual database id)
    property = Property.find_by(id: property_id.to_i)
    return unless property && property.admin && property.admin.wallet

    # Find the correct house by house_number
    house_obj = property.houses.find_by(house_number: house_number)
    if house_obj
      agreement = TenantHouseAgreement.where(
        house_id: house_obj.id,
        property_id: house_obj.property_id,
        status: 'active'
      ).first

      # Credit the agreement if found
      agreement.credit!(transaction_amount) if agreement
    end

    # Also credit the Admin’s wallet and create a ledger entry.
    wallet = property.admin.wallet
    wallet.with_lock do
      wallet.credit!(transaction_amount)

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
    if (property = Property.find_by(id: property_id.to_i)) && property.admin
      PaymentsChannel.broadcast_to(property.admin, payment: as_json)
    end
  rescue StandardError => e
    Rails.logger.error "Failed to broadcast payment: #{e.message}"
  end

  def enqueue_sms_notification
    PaymentSmsJob.perform_later(id)
  end
end
