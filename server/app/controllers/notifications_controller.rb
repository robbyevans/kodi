class NotificationsController < ApplicationController
  before_action :authenticate_admin

  # POST /notifications/tenant/:tenant_id
  def tenant
    history = current_admin.tenant_notification_histories.create!(
      subject: params[:subject],
      body: params[:body],
      sent_at: Time.current
    )

    tenant = Tenant.find(params[:tenant_id])
    history.tenants << tenant

    UserMailer
      .tenant_notification_email(tenant, history.subject, history.body)
      .deliver_later

    head :ok
  end

  # POST /notifications/tenants
  def all_tenants
    history = current_admin.tenant_notification_histories.create!(
      subject: params[:subject],
      body: params[:body],
      sent_at: Time.current
    )

    # only tenants under this admin’s properties
    tenants = Tenant
              .joins(houses: :property)
              .where(properties: { admin_id: current_admin.id })
              .distinct

    history.tenants << tenants

    tenants.find_each do |tenant|
      UserMailer
        .tenant_notification_email(tenant, history.subject, history.body)
        .deliver_later
    end

    head :ok
  end
end
