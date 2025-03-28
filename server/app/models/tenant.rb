class Tenant < ApplicationRecord
  has_many :houses, dependent: :nullify

  validates :name, :phone_number, :email, :national_id, presence: true
end
