require "AfricasTalking"

class SmsNotificationService
  def initialize(phone_number, message)
    @phone_number = phone_number
    @message = message
    @username = ENV['AFRICASTALKING_USERNAME']  # Should be "sandbox" if testing sandbox
    @api_key = ENV['AFRICASTALKING_API_KEY']
  end

  def perform
    Rails.logger.info "SmsNotificationService credentials: username=#{@username.inspect}, api_key=#{@api_key.inspect}"
    
    # Initialize the SDK correctly
    at = AfricasTalking::Initialize.new(@username, @api_key)
    sms = at.sms
    
    # Initialize options as an empty hash
    options = {}
    # Only set the sender ID if you're not in sandbox mode (optional)
    options["from"] = "Kodi Property Management" unless @username == "sandbox"
    
    response = sms.send({
      "message" => @message,
      "to" => @phone_number,
      **options
    })
    
    Rails.logger.info "SMS sent successfully: #{response.inspect}"
    response
  rescue StandardError => e
    Rails.logger.error "SMS sending failed: #{e.message}"
    nil
  end
  
end
