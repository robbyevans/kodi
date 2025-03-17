class WithdrawalService
  def initialize(admin, amount)
    @admin = admin
    @amount = amount.to_d
  end

  def perform
    @admin.wallet.with_lock do
      raise StandardError, "Insufficient funds" if @amount > @admin.wallet.balance

      # Optionally: initiate external transfer (e.g., via Flutterwave)
      # external_response = FlutterwavePayoutService.new(@admin, @amount, recipient_details).perform
      # raise StandardError, "Withdrawal failed: #{external_response['message']}" unless external_response["status"] == "success"

         # Initiate payout via Flutterwave
         flw_result = FlutterwavePayoutService.new(@admin, @amount).perform
         unless flw_result[:success]
           raise StandardError, "Withdrawal failed: #{flw_result[:error]}"
         end

      # Debit the wallet
      @admin.wallet.debit!(@amount)
      
      # Record the withdrawal in the ledger as a debit
      LedgerEntry.create!(
        admin: @admin,
        wallet: @admin.wallet,
        transaction_type: "withdrawal",
        amount: @amount,
        balance_after: @admin.wallet.balance,
        description: "Withdrawal processed"
      )
      
      # Record the withdrawal in the Withdrawal model as completed
      Withdrawal.create!(admin: @admin, amount: @amount, status: "completed")
    end
  rescue => e
    # Record a failed withdrawal for audit purposes
    Withdrawal.create!(admin: @admin, amount: @amount, status: "failed", details: e.message)
    raise e
  end
end
