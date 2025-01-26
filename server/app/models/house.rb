class House < ApplicationRecord
  belongs_to :property
  belongs_to :tenant, optional: true

  validates :house_number, presence: true
end
