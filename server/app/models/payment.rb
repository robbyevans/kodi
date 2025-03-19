class Payment < ApplicationRecord
  # Validations to ensure data integrity
  validates :transaction_id, presence: true, uniqueness: true
  validates :transaction_amount, presence: true, numericality: { greater_than: 0 }
  validates :bill_ref_number, :msisdn, :transaction_type, :payment_date, :short_code, :status, presence: true

  # After a payment record is created, update the landlord's wallet
  after_create :credit_landlord_wallet
  # After a payment is received broadcast this payment
  after_create_commit :broadcast_payment

  private

  def credit_landlord_wallet
    property = Property.find_by(unique_id: property_id)
    return unless property && property.admin && property.admin.wallet

    wallet = property.admin.wallet

    wallet.with_lock do
      # Credit the wallet with the transaction amount
      wallet.credit!(transaction_amount)
      
      # Create a ledger entry for the deposit
      LedgerEntry.create!(
        admin: property.admin,
        wallet: wallet,
        transaction_type: "deposit",
        amount: transaction_amount,
        balance_after: wallet.balance,
        description: "Rent payment received (Payment ID: #{transaction_id})"
      )
    end
  rescue => e
    Rails.logger.error "Failed to credit wallet: #{e.message}"
  end

  def broadcast_payment
    if (property = Property.find_by(unique_id: property_id)) && property.admin
      # Broadcast to the PaymentsChannel for this admin
      PaymentsChannel.broadcast_to(property.admin, payment: self.as_json)
    end
  rescue => e
    Rails.logger.error "Failed to broadcast payment: #{e.message}"
  end
end
