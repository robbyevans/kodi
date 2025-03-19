# File: app/jobs/payment_sms_job.rb
class PaymentSmsJob < ApplicationJob
  queue_as :default

  def perform(payment_id)
    payment = Payment.find_by(id: payment_id)
    return unless payment

    property = Property.find_by(unique_id: payment.property_id)
    return unless property

    house = property.houses.find_by(house_number: payment.house_number)
    tenant_phone = house&.tenant&.phone_number
    msisdn = payment.msisdn

    message = "Dear Tenant, we confirm receipt of your rent payment for House #{payment.house_number} of KES #{payment.transaction_amount} (Transaction ID: #{payment.transaction_id}). Thank you for your prompt payment. Regards, Kodi Property Management."

    # Create a list of unique phone numbers (avoid duplicates if tenant_phone equals msisdn)
    numbers = []
    numbers << tenant_phone if tenant_phone.present?
    numbers << msisdn if msisdn.present? && msisdn != tenant_phone

    numbers.each do |number|
      SmsNotificationService.new(number, message).perform
    end
  end
end
