class Admin < ApplicationRecord
  has_secure_password
  has_many :properties, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin system_admin] }
end
