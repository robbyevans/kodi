# server/app/controllers/notifications_controller.rb

class NotificationsController < ApplicationController
  before_action :authenticate_admin

  # POST /notifications
  # Params:
  #   subject:    string
  #   body:       string
  #   tenant_ids: [int]    # optional; empty or missing → broadcast to all your tenants
  def create
    # 1) figure out recipients
    ids = Array(params[:tenant_ids]).map(&:to_i).reject(&:zero?)
    recipients =
      if ids.any?
        Tenant.where(id: ids)
      else
        Tenant
          .joins(houses: :property)
          .where(properties: { admin_id: current_admin.id })
          .distinct
      end

    # 2) one history row
    history = current_admin.tenant_notification_histories.create!(
      subject: params[:subject],
      body: params[:body],
      sent_at: Time.current
    )
    history.tenants << recipients

    # 3) deliver in background
    recipients.find_each do |tenant|
      UserMailer
        .tenant_notification_email(tenant, history.subject, history.body)
        .deliver_later
    end

    head :ok
  end
end
