class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
end
