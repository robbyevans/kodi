# app/services/flutterwave_payout_service.rb
require 'faraday'
require 'json'

class FlutterwavePayoutService
  FLW_BASE_URL = "https://api.flutterwave.com/v3"  # Use test or live endpoint as needed

  def initialize(admin, amount)
    @admin = admin
    @amount = amount.to_d
    @secret_key = Rails.application.credentials.flutterwave[:secret_key] || ENV['FLUTTERWAVE_SECRET_KEY']
  end

  def perform
    # Build the payout payload
    payload = {
      account_bank: "KE",  # For Kenyan banks; adjust accordingly or pass bank code dynamically
      account_number: @admin.phone_number,  # or use a dedicated bank account number stored in admin/wallet
      amount: @amount.to_f,
      currency: "KES",
      narration: "Withdrawal for #{@admin.name}",
      reference: SecureRandom.hex(10)
    }

    # Create a connection
    conn = Faraday.new(url: FLW_BASE_URL) do |faraday|
      faraday.request :json
      faraday.response :json, parser_options: { symbolize_names: true }
      faraday.adapter Faraday.default_adapter
    end

    response = conn.post("/payouts") do |req|
      req.headers["Authorization"] = "Bearer #{@secret_key}"
      req.headers["Content-Type"] = "application/json"
      req.body = payload.to_json
    end

    # Check for success
    if response.success? && response.body[:status] == "success"
      return { success: true, data: response.body[:data] }
    else
      error_message = response.body[:message] || "Unknown error"
      return { success: false, error: error_message }
    end
  rescue => e
    Rails.logger.error "Flutterwave Payout Error: #{e.message}"
    { success: false, error: e.message }
  end
end
