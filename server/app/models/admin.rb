class Admin < ApplicationRecord
  has_secure_password
  has_many :properties,foreign_key: 'admin_id', dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin system_admin] }
  validates :password, length: { minimum: 4 }, format: { with: /[A-Z]/, message: "must include at least one uppercase letter" }
end
