class Admin < ApplicationRecord
  has_secure_password
  has_many :properties, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin system_admin] }
  validates :password, length: { minimum: 8 }, format: { with: /\A(?=.*[A-Z])(?=.*[!@#$%^&*])/, message: "must include at least one uppercase letter and one special character" }
end
