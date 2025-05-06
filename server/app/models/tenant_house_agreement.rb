# app/models/tenant_house_agreement.rb
class TenantHouseAgreement < ApplicationRecord
  belongs_to :tenant
  belongs_to :house
  belongs_to :property

  scope :active, lambda {
    where(status: 'active')
      .where('end_date IS NULL OR end_date > ?', Time.current)
  }

  validates :status, presence: true, inclusion: { in: %w[active ended evicted] }
  validates :deposit, :monthly_rent,
            numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  before_create :set_start_date

  # If no start_date is provided, set it to now
  def set_start_date
    self.start_date ||= Time.current
  end

  # Credit money to the agreement
  def credit!(amount)
    update!(balance: balance + amount)
  end

  # Debit money (rent, deposit, etc.) from the agreement
  def debit!(amount)
    update!(balance: balance - amount)
  end

  def end_agreement!
    update!(status: 'ended', end_date: Time.current)
  end

  def status_label
    if balance < 0
      'Owing'
    elsif balance > 0
      'Credit'
    else
      'Settled'
    end
  end

  def active?
    status == 'active' && (end_date.nil? || end_date > Time.current)
  end
end
