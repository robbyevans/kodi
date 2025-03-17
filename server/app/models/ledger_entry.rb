class LedgerEntry < ApplicationRecord
  belongs_to :admin
  belongs_to :wallet

  validates :transaction_type, presence: true, inclusion: { in: %w[deposit withdrawal] }
  validates :amount, numericality: { greater_than: 0 }
  validates :balance_after, numericality: true
end
