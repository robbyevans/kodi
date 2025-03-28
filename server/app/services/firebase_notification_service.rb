# /server/app/services/firebase_notification_service.rb
require 'fcm'

class FirebaseNotificationService
  def initialize
    @fcm = FCM.new(Rails.application.credentials.dig(:firebase, :server_key)) 
    # Make sure you store the key in Rails credentials
  end

  def send_payment_notification(registration_tokens, property_name, house_number)
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
    @fcm.send(registration_tokens, options)
  end
end