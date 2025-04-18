# Core service for sending SMS using Africa's Talking API.
# Other SMS services inherit from this and pass message and recipient.

# require 'africastalking'

class SmsNotificationService
  def initialize(phone_number, message)
    @phone_number = "+#{phone_number.sub(/^0/, '254')}" # Convert 07... to +2547...
    @message = message
    @username = ENV['AFRICASTALKING_USERNAME']
    @api_key = ENV['AFRICASTALKING_API_KEY']
  end

  def perform
    Rails.logger.info "Sending SMS to #{@phone_number}: #{@message}"
    at = AfricasTalking::Initialize.new(@username, @api_key)
    sms = at.sms

    response = sms.send({
                          'message' => @message,
                          'to' => @phone_number
                        })

    Rails.logger.info "SMS sent successfully: #{response.inspect}"
    response
  rescue StandardError => e
    Rails.logger.error "SMS sending failed: #{e.message}"
    nil
  end
end
