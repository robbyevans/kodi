class SendNewMonthNotificationJob < ApplicationJob
  queue_as :default

  def perform
    title = '🎉 Happy New Month!'
    body = 'Wishing you a productive and prosperous month ahead.'

    Admin.where(is_notifications_allowed: true).find_each do |admin|
      next unless admin.device_token.present?

      Rails.logger.info "📢 Sending new month notification to Admin ID: #{admin.id}"
      FirebaseService.send_notification(admin.device_token, title, body)
    end
  end
end
