class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
  validates :name, presence: true
end
