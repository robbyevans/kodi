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
    
     # Set sender ID based on environment – always set for production
     sender_id = Rails.env.production? ? "KODI_PMS" : nil
     options = {}
     options["from"] = sender_id if sender_id.present?
    
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
