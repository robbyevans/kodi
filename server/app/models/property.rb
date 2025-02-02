class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
  validates :name, presence: true, uniqueness: { scope: :admin_id, message: "should be unique per admin" }
end
