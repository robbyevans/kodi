# Sends a friendly reminder SMS to tenants who are late on rent.

module SmsProviders
  class RentReminderSmsService
    def self.send(phone_number, house_name, property_name)
      message = "Dear tenant, your rent for #{property_name}, House #{house_name} is due soon. Kindly remember to pay on time."
      SmsNotificationService.new(phone_number, message).perform
    end
  end
end
