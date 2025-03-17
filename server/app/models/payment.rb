class Payment < ApplicationRecord
  # Validations to ensure data integrity
  validates :transaction_id, presence: true, uniqueness: true
  validates :bill_ref_number, presence: true
  validates :msisdn, presence: true
  validates :transaction_amount, presence: true, numericality: { greater_than: 0 }
  validates :transaction_type, presence: true
  validates :payment_date, presence: true
  validates :short_code, presence: true
  validates :status, presence: true

  # Optionally, if you want to define any scopes or associations in the future, you can do so here.
  # For example, if you later add associations with properties or houses:
  # belongs_to :property, primary_key: :unique_id, foreign_key: :property_id, optional: true
  # (Note: Make sure such associations match your schema and requirements.)
end
