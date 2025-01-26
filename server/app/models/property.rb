class Property < ApplicationRecord
  has_many :houses, dependent: :destroy
end
