class PaymentSmsJob < ApplicationJob
  queue_as :default

  def perform(payment_id)
    payment = Payment.find_by(id: payment_id)
    return unless payment

    property = Property.find_by(property_uid: payment.property_uid)
    return unless property

    house = property.houses.find_by(house_number: payment.house_number)
    tenant_phone = house&.tenant&.phone_number
    msisdn = payment.msisdn

    # Normalize the numbers if present
    normalized_tenant = tenant_phone.present? ? normalize_phone(tenant_phone) : nil
    normalized_msisdn = msisdn.present? ? normalize_phone(msisdn) : nil

    message = "Dear Tenant, we confirm receipt of your rent payment for House #{payment.house_number} of KES #{payment.transaction_amount} (Transaction ID: #{payment.transaction_id}). Thank you for your prompt payment. Regards, Kodi Property Management."

    # Create a list of unique phone numbers (avoid duplicates if tenant_phone equals msisdn)
    numbers = []
    numbers << normalized_tenant if normalized_tenant.present?
    numbers << normalized_msisdn if normalized_msisdn.present? && normalized_msisdn != normalized_tenant

    numbers.each do |number|
      SmsNotificationService.new(number, message).perform
    end
  end

  def normalize_phone(number)
    digits = number.gsub(/\D/, '')
    if digits.start_with?('0')
      '+254' + digits[1..-1]
    else
      number.start_with?('+') ? number : "+#{digits}"
    end
  end
end
