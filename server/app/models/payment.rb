class Payment < ApplicationRecord
  # — Validations —
  validates :transaction_id,     presence: true, uniqueness: true
  validates :transaction_amount, presence: true, numericality: { greater_than: 0 }
  validates :bill_ref_number,
            :house_number,
            :property_id,
            :msisdn,
            :transaction_type,
            :payment_date,
            :short_code,
            :status,
            presence: true

  # — Callbacks —
  after_create         :credit_landlord_wallet
  after_create_commit  :broadcast_payment, :send_tenant_receipt

  private

  def credit_landlord_wallet
    Rails.logger.info "credit_landlord_wallet for Payment #{transaction_id}"
    property = Property.find_by(id: property_id.to_i)
    return unless property&.admin&.wallet

    # Credit tenant’s agreement account
    if (house = property.houses.find_by(house_number: house_number))
      if (agreement = TenantHouseAgreement.active.find_by(house: house, property: property))
        agreement.credit!(transaction_amount)
      else
        Rails.logger.warn "No active agreement for house #{house_number}"
      end
    end

    # Credit admin’s wallet
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
      Rails.logger.info "Admin wallet credited; new balance: #{wallet.balance}"
    end
  rescue StandardError => e
    Rails.logger.error "credit_landlord_wallet failed: #{e.message}"
  end

  def broadcast_payment
    Rails.logger.info "broadcast_payment for Payment #{transaction_id}"
    if (property = Property.find_by(id: property_id.to_i)) && property.admin
      PaymentsChannel.broadcast_to(property.admin, payment: as_json)
      Rails.logger.info "Broadcasted to admin #{property.admin.id}"
    end
  rescue StandardError => e
    Rails.logger.error "broadcast_payment failed: #{e.message}"
  end

  def send_tenant_receipt
    return unless (house = House.find_by(house_number: house_number))&.tenant&.email.present?

    UserMailer.payment_receipt_email(house.tenant, self).deliver_later
  end
end
