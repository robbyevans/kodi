# Specialized service for sending payment confirmation SMS messages to landlords and tenants.

module Sms
  class PaymentSmsService
    def self.send_to_landlord(admin_phone, amount, house_number)
      message = "💸 Kodi Alert: You’ve received KES #{amount} for House #{house_number}."
      SmsNotificationService.new(admin_phone, message).perform
    end

    def self.send_to_tenant(tenant_phone, amount, house_number)
      message = "✅ Rent received! KES #{amount} for House #{house_number}. Thank you!"
      SmsNotificationService.new(tenant_phone, message).perform
    end
  end
end
