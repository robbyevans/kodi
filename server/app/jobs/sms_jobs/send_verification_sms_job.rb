# Sends a phone‑verification SMS to a newly created admin.

class SmsJobs::SendVerificationSmsJob < ApplicationJob
  queue_as :default

  def perform(admin_id)
    admin = Admin.find_by(id: admin_id)
    return unless admin&.phone_number.present?

    SmsProviders::VerificationSmsService.send(admin.phone_number, admin.name)
  end
end
