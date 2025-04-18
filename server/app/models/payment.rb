class Payment < ApplicationRecord
  # Validations to ensure data integrity
  validates :transaction_id, presence: true, uniqueness: true
  validates :transaction_amount, presence: true, numericality: { greater_than: 0 }
  validates :bill_ref_number, :house_number, :property_id, :msisdn, :transaction_type, :payment_date, :short_code,
            :status, presence: true

  # After a payment record is created, update the landlord's wallet
  after_create :credit_landlord_wallet

  # After a payment is received, broadcast this payment
  after_create_commit :broadcast_payment

  # After a successful payment, trigger SMS notification to both the tenant and msisdn
  after_create_commit -> { SmsJobs::SendPaymentSmsJob.perform_later(id) }

  private

  def credit_landlord_wallet
    Rails.logger.info "Starting credit_landlord_wallet for Payment ID: #{transaction_id}"
    property = Property.find_by(id: property_id.to_i)
    return unless property && property.admin && property.admin.wallet

    house_obj = property.houses.find_by(house_number: house_number)
    if house_obj
      agreement = TenantHouseAgreement.where(
        house_id: house_obj.id,
        property_id: house_obj.property_id,
        status: 'active'
      ).first
      if agreement
        Rails.logger.info "Crediting TenantHouseAgreement for house: #{house_number}"
        agreement.credit!(transaction_amount)
      else
        Rails.logger.warn "No active TenantHouseAgreement found for house: #{house_number}"
      end
    end

    wallet = property.admin.wallet
    wallet.with_lock do
      wallet.credit!(transaction_amount)
      LedgerEntry.create!(
        admin: property.admin,
        wallet: wallet,
        transaction_type: 'deposit',
        amount: transaction_amount,
        balance_after: wallet.balance,
        transaction_id: transaction_id,
        house_number: house_number,
        property_uid: property_uid
      )
      Rails.logger.info "Admin wallet credited. New balance: #{wallet.balance}"
    end
  rescue StandardError => e
    Rails.logger.error "Failed to credit wallet: #{e.message}"
  end

  def broadcast_payment
    Rails.logger.info "Starting broadcast_payment for Payment ID: #{transaction_id}"
    if (property = Property.find_by(id: property_id.to_i)) && property.admin
      PaymentsChannel.broadcast_to(property.admin, payment: as_json)
      Rails.logger.info "Broadcasted payment to admin with ID: #{property.admin.id}"
    end
  rescue StandardError => e
    Rails.logger.error "Failed to broadcast payment: #{e.message}"
  end
end
