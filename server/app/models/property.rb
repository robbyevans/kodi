class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
