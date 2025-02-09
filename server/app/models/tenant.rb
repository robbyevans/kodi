class Tenant < ApplicationRecord
  has_many :houses, dependent: :nullify

  # National ID is required but house_deposit_paid is optional.
  validates :name, :phone_number, :email, :national_id, presence: true
  validates :house_deposit_paid, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
