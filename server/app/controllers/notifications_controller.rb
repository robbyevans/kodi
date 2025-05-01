class NotificationsController < ApplicationController
  before_action :authenticate_admin

  # POST /notifications/tenant/:tenant_id
  def tenant
    tenant = Tenant.find(params[:tenant_id])
    UserMailer.tenant_notification_email(
      tenant,
      params[:subject],
      params[:body]
    ).deliver_later

    head :ok
  end

  # POST /notifications/tenants
  def all_tenants
    Tenant.find_each do |tenant|
      UserMailer.tenant_notification_email(
        tenant,
        params[:subject],
        params[:body]
      ).deliver_later
    end

    head :ok
  end
end
