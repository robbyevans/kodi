
class WithdrawalService
  def initialize(admin, amount, withdrawal_type, recipient_details)
    @admin = admin
    @amount = amount.to_d
    @withdrawal_type = withdrawal_type  # "mpesa" or "bank"
    @recipient_details = recipient_details  # e.g., { "mobile_number" => "2547XXXXXX" } or bank details hash
  end

  def perform
    @admin.wallet.with_lock do
      raise StandardError, "Insufficient funds" if @amount > @admin.wallet.balance

      # Initiate payout via Flutterwave (see updated service below)
      flw_result = FlutterwavePayoutService.new(@admin, @amount, @withdrawal_type, @recipient_details).perform
      unless flw_result[:success]
        raise StandardError, "Withdrawal failed: #{flw_result[:error]}"
      end

      # Debit the wallet
      @admin.wallet.debit!(@amount)

      # Create ledger entry
      LedgerEntry.create!(
        admin: @admin,
        wallet: @admin.wallet,
        transaction_type: "withdrawal",
        amount: @amount,
        balance_after: @admin.wallet.balance,
        description: "Withdrawal via #{@withdrawal_type}"
      )

      # Record the withdrawal as completed
      Withdrawal.create!(admin: @admin, amount: @amount, status: "completed", details: "Withdrawal via #{@withdrawal_type}")
    end
  rescue => e
    Withdrawal.create!(admin: @admin, amount: @amount, status: "failed", details: e.message)
    raise e
  end
end
