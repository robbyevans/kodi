# app/jobs/sms_jobs/send_rent_reminder_sms_job.rb

# ✅ This job runs on the 10th of every month at 9AM (via Sidekiq Scheduler).
# ✅ It finds all active TenantHouseAgreements where balance < 0 (rent unpaid).
# ✅ Sends an SMS rent reminder to each relevant tenant.

module SmsJobs
  class SendRentReminderSmsJob < ApplicationJob
    queue_as :default

    def perform
      agreements = TenantHouseAgreement
                   .includes(:tenant, :house)
                   .where('balance < 0')
                   .where(status: :active)

      agreements.find_each do |agreement|
        tenant = agreement.tenant
        house = agreement.house

        next if tenant.blank? || house.blank? || tenant.phone_number.blank?
        next unless house && house.property && tenant.phone_number.present?

        Sms::RentReminderSmsService.send(tenant.phone_number, house.house_number, house.property.name)
        Rails.logger.info "[RentReminderSMS] Sent to #{tenant.full_name} for House: #{house.house_number}"
      end
    end
  end
end
