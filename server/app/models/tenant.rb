class Tenant < ApplicationRecord
  has_many :houses, dependent: :nullify

  validates :name, :phone_number, :email, presence: true
end
