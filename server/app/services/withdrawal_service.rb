# /server/app/services/withdrawal_service.rb
require 'httparty'

class WithdrawalService
  def initialize(admin, amount, withdrawal_type, recipient_details)
    @admin = admin
    @amount = amount
    @withdrawal_type = withdrawal_type
    # Ensure recipient details includes the M-Pesa mobile number (key: :mpesa_number)
    @recipient_details = recipient_details.to_h.with_indifferent_access
  end

  def perform
    wallet = @admin.wallet
    raise StandardError, 'Insufficient funds' if @amount > wallet.balance

    # Initiate the disbursement via IntaSend's MPesa transfer API
    response = intasend_withdrawal(@amount, @recipient_details)
    unless response['status'] == 'success'
      raise StandardError, "IntaSend withdrawal failed: #{response['message'] || response}"
    end

    # Deduct the withdrawal amount from the wallet only upon a successful API response
    wallet.debit!(@amount)

    # Record a ledger entry for the withdrawal (no property details for a withdrawal)
    LedgerEntry.create!(
      admin: @admin,
      wallet: wallet,
      transaction_type: 'withdrawal',
      amount: @amount,
      balance_after: wallet.balance,
      transaction_id: response['transaction_id'] || SecureRandom.hex(10),
      property_id: nil,
      house_number: nil
    )

    # Create a withdrawal record with details from IntaSend
    Withdrawal.create!(
      admin: @admin,
      amount: @amount,
      status: 'success',
      details: "Withdrawal to #{@recipient_details[:mpesa_number]} via IntaSend. Response: #{response.to_json}"
    )
  end

  private

  def intasend_withdrawal(amount, recipient_details)
    # IMPORTANT:
    # Use your secret key and do NOT expose it on the frontend.
    api_key = ENV['INTASEND_SECRET_KEY'] # Your secret key (starts with ISSecretKey_)

    # Set the API base URL depending on your mode—sandbox or live.
    # You can use an env variable INTASEND_BASE_URL or determine based on INTASEND_MODE.
    base_url = ENV['INTASEND_BASE_URL'] || if ENV['INTASEND_MODE'] == 'live'
                                             'https://payment.intasend.com/api/'
                                           else
                                             'https://sandbox.intasend.com/api/'
                                           end

    # New env variables for disbursement configuration
    wallet_id = ENV['INTASEND_WITHDRAWAL_WALLET_ID']  # The wallet from which funds will be debited
    device_id = ENV['INTASEND_DEVICE_ID']             # Your device ID provided by IntaSend

    # According to the documentation, the disbursement endpoint for MPesa is for example "transfer/mpesa"
    withdrawal_endpoint = 'transfer/mpesa'

    # Construct the transactions array as per IntaSend documentation
    transactions = [{
      name: @admin.name || 'Beneficiary',
      account: recipient_details[:mpesa_number], # Must be in full international format (e.g., 2547xxxxx)
      amount: amount.to_f,
      narrative: 'Withdrawal request'
    }]

    payload = {
      wallet_id: wallet_id,
      device_id: device_id,
      currency: 'KES',
      transactions: transactions,
      requires_approval: 'NO' # Set to NO for immediate processing; adjust if you require approval
    }

    response = HTTParty.post(
      "#{base_url}#{withdrawal_endpoint}",
      headers: {
        'Content-Type' => 'application/json',
        'Authorization' => "Bearer #{api_key}"
      },
      body: payload.to_json
    )

    response.parsed_response
  rescue StandardError => e
    raise StandardError, "IntaSend API call failed: #{e.message}"
  end
end
