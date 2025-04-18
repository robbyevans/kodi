# This job sends an SMS to the admin after account creation for phone number verification.

class SmsJobs::SendVerificationSmsJob < ApplicationJob
  queue_as :default

  def perform(admin_id)
    admin = Admin.find_by(id: admin_id)
    return unless admin && admin.phone_number.present?

    Sms::VerificationSmsService.send(admin.phone_number, admin.name)
  end
end
