# Triggers SMS notifications to both landlord and tenant after payment.

class SmsJobs::SendPaymentSmsJob < ApplicationJob
  queue_as :default

  def perform(payment_id)
    payment  = Payment.find(payment_id)
    property = Property.find_by(id: payment.property_id)
    return unless property

    tenant_phone = payment.msisdn
    admin_phone  = property.admin.phone_number

    SmsProviders::PaymentSmsService.send_to_landlord(admin_phone, payment.transaction_amount, payment.house_number)
    SmsProviders::PaymentSmsService.send_to_tenant(tenant_phone, payment.transaction_amount, payment.house_number)
  end
end
