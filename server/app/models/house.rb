class House < ApplicationRecord
  belongs_to :property
  belongs_to :tenant, optional: true

  has_many :tenant_house_agreements
  has_many :active_tenant_house_agreements, -> {
    where(status: 'active')
  }, class_name: 'TenantHouseAgreement' 

  validates :house_number, presence: true, uniqueness: { scope: :property_id, message: "should be unique within a property" }
  validates :payable_rent, numericality: { greater_than_or_equal_to: 0 }
  validates :payable_deposit, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  before_validation :generate_account_number

  private

  def generate_account_number
    if property && property.unique_id.present? && house_number.present?
      self.account_number = "#{property.unique_id}##{house_number}"
    end
  end
end
