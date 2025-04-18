# File: server/app/services/sms_notification_service.rb
# Core service for sending SMS via Africa's Talking.
# Other SMS services inherit from this and pass message + recipient.

# NOTE: the AfricasTalking Ruby SDK defines its file as lib/AfricasTalking.rb,
# so the require must match that exact casing.
require 'AfricasTalking'

class SmsNotificationService
  # @param phone_number [String] local format (e.g. "0712...") or international ("+2547...")
  # @param message      [String] the SMS body
  def initialize(phone_number, message)
    # ensure E.164: convert leading "0" → "+254"
    @phone_number = phone_number.to_s.sub(/\A0/, '+254')
    @message      = message
    @username     = ENV.fetch('AFRICASTALKING_USERNAME')
    @api_key      = ENV.fetch('AFRICASTALKING_API_KEY')
  end

  # Sends the SMS and returns the raw response (or nil on failure).
  def perform
    Rails.logger.info "[SmsNotificationService] Sending SMS to #{@phone_number}: #{@message}"

    # Initialize the SDK client
    at_client   = AfricasTalking::Initialize.new(@username, @api_key)
    sms_service = at_client.sms

    # send returns a hash with status/results
    response = sms_service.send(
      'message' => @message,
      'to' => @phone_number
    )

    Rails.logger.info "[SmsNotificationService] SMS sent successfully: #{response.inspect}"
    response
  rescue StandardError => e
    Rails.logger.error "[SmsNotificationService] SMS sending failed: #{e.message}"
    nil
  end
end
