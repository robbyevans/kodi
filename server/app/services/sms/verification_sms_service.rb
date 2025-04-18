# Sends SMS to verify phone number after an admin registers.

module Sms
  class VerificationSmsService
    def self.send(phone_number, admin_name)
      message = "Hello #{admin_name}, welcome to Kodi! Please verify your phone number."
      SmsNotificationService.new(phone_number, message).perform
    end
  end
end
