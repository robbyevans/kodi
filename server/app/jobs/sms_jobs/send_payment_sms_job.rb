# This job is triggered after a payment is created.
# It sends SMS notifications to both the landlord and tenant confirming payment receipt.

class SmsJobs::SendPaymentSmsJob < ApplicationJob
  queue_as :default

  def perform(payment_id)
    payment = Payment.find(payment_id)
    property = Property.find_by(id: payment.property_id)
    return unless property

    tenant_phone = payment.msisdn
    admin_phone = property.admin.phone_number

    Sms::PaymentSmsService.send_to_landlord(admin_phone, payment.transaction_amount, payment.house_number)
    Sms::PaymentSmsService.send_to_tenant(tenant_phone, payment.transaction_amount, payment.house_number)
  end
end
