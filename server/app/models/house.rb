class House < ApplicationRecord
  belongs_to :property
  belongs_to :tenant, optional: true

  validates :house_number, :property_id, presence: true
  validates :payable_rent, numericality: { greater_than: 0 }
end
