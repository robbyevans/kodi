# Sends a phone‑verification SMS to a newly created admin.

class SmsJobs::SendVerificationSmsJob < ApplicationJob
  queue_as :default

  def perform(admin_id)
    unless Rails.env.production?
      Rails.logger.info "DEV: Skipping SMS send (verification) for admin_id=#{admin_id}"
      return
    end

    admin = Admin.find_by(id: admin_id)
    return unless admin&.phone_number.present?

    SmsProviders::VerificationSmsService.send(admin.phone_number, admin.name)
  end
end
