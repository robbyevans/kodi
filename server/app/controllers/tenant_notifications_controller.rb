class TenantNotificationsController < ApplicationController
  def create
    history = TenantNotificationHistory.new(admin: current_admin)
    authorize history

    ids        = Array(params[:tenant_ids]).map(&:to_i).reject(&:zero?)
    tenants_sc = policy_scope(Tenant)
    recipients = ids.any? ? tenants_sc.where(id: ids) : tenants_sc

    history.subject = params[:subject]
    history.body    = params[:body]
    history.sent_at = Time.current
    history.save!

    failed = []

    recipients.find_each do |tenant|
      UserMailer
        .tenant_notification_email(tenant, history.subject, history.body)
        .deliver_later
    rescue StandardError => e
      Rails.logger.error "❌ Failed to enqueue mail for tenant##{tenant.id}: #{e.class} #{e.message}"
      failed << { tenant_id: tenant.id, error: e.message }
    end

    if failed.any?
      # You could store these in history.failed_recipients (a JSON column),
      # or just return them so the client knows:
      render json: { notice: 'Some emails failed to enqueue', failures: failed }, status: :multi_status
    else
      head :no_content
    end
  end
end
