# /server/app/services/firebase_notification_service.rb

require 'fcm'

class FirebaseNotificationService
  MAX_TOKENS_PER_REQUEST = 500

  def initialize
    @fcm = FCM.new(Rails.application.credentials.dig(:firebase, :server_key))
  end

  def send_payment_notification(registration_tokens, property_name, house_number)
    return if registration_tokens.blank?

    registration_tokens.each_slice(MAX_TOKENS_PER_REQUEST) do |token_batch|
      options = {
        notification: {
          title: "New Payment Received!",
          body: "Payment from #{property_name}, House #{house_number}",
          icon: "/kodi-logo192px.png"
        },
        data: {
          property_name: property_name,
          house_number: house_number
        }
      }

      response = @fcm.send(token_batch, options)

      Rails.logger.info("FCM Notification Response: #{response}")

      # Optional: If you want to handle errors
      unless response[:status_code] == 200
        Rails.logger.error("FCM Notification Error: #{response}")
      end
    end
  rescue => e
    Rails.logger.error("FCM Notification Exception: #{e.message}")
  end
end