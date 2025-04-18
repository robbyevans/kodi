# Runs on the 10th of each month at 9AM via Sidekiq‑Scheduler.

module SmsJobs
  class SendRentReminderSmsJob < ApplicationJob
    queue_as :default

    def perform
      TenantHouseAgreement
        .includes(:tenant, :house)
        .where('balance < 0 AND status = ?', 'active') # Corrected query
        .find_each do |agreement|
          tenant = agreement.tenant
          house  = agreement.house
          next unless tenant&.phone_number && house&.property

          SmsProviders::RentReminderSmsService.send(tenant.phone_number, house.house_number, house.property.name)
          Rails.logger.info "[RentReminderSMS] Sent to #{tenant.name} for House: #{house.house_number}"
        end
    end
  end
end
