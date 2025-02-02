class House < ApplicationRecord
  belongs_to :property
  belongs_to :tenant, optional: true # A house can exist without a tenant (vacant)
  validates :house_number, presence: true, uniqueness: { scope: :property_id, message: "should be unique within a property" }
  validates :payable_rent, numericality: { greater_than: 0 }
end
