class Wallet < ApplicationRecord
  belongs_to :admin

  # Safely add funds
  def credit!(amount)
    with_lock do
      update!(balance: balance + amount)
    end
  end

  # Safely deduct funds for a withdrawal
  def debit!(amount)
    with_lock do
      raise StandardError, "Insufficient funds" if amount > balance
      update!(balance: balance - amount)
    end
  end
end
