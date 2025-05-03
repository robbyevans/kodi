# app/models/tenant.rb

class Tenant < ApplicationRecord
  has_many :houses, dependent: :nullify

  validates :name, :phone_number, :email, :national_id, presence: true

  has_many :tenant_notification_recipients, dependent: :destroy
  has_many :notification_histories,
           through: :tenant_notification_recipients,
           source: :tenant_notification_history

  # Pick the “current” house however you like;
  # here we just take the first one
  def current_house
    houses.first
  end

  def house_number
    current_house&.house_number
  end

  def property_id
    current_house&.property_id
  end

  def property_name
    current_house&.property&.name
  end
end
