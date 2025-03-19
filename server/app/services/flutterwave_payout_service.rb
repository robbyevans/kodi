class FlutterwavePayoutService
  FLW_BASE_URL = "https://api.flutterwave.com/v3"  # Adjust as needed

  def initialize(admin, amount, withdrawal_type, recipient_details)
    @admin = admin
    @amount = amount.to_d
    @withdrawal_type = withdrawal_type  # "mpesa" or "bank"
    @recipient_details = recipient_details
    @secret_key = Rails.application.credentials.flutterwave[:secret_key] || ENV['FLUTTERWAVE_SECRET_KEY']
  end

  def perform
    payload = {
      amount: @amount.to_f,
      currency: "KES",
      narration: "Withdrawal for #{@admin.name}",
      reference: SecureRandom.hex(10)
    }

    if @withdrawal_type == "mpesa"
      payload.merge!({
        account_bank: "MPESA",  # Use a designated code or value for MPesa
        account_number: @recipient_details["mobile_number"]
      })
    elsif @withdrawal_type == "bank"
      payload.merge!({
        account_bank: @recipient_details["bank_code"],
        account_number: @recipient_details["account_number"],
        beneficiary_name: @recipient_details["account_name"]
      })
    else
      return { success: false, error: "Invalid withdrawal type" }
    end

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

    if response.success? && response.body[:status] == "success"
      { success: true, data: response.body[:data] }
    else
      error_message = response.body[:message] || "Unknown error"
      { success: false, error: error_message }
    end
  rescue => e
    Rails.logger.error "Flutterwave Payout Error: #{e.message}"
    { success: false, error: e.message }
  end
end
