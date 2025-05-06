class TenantNotificationHistoriesController < ApplicationController
  # GET /tenant_notification_histories
  def index
    authorize TenantNotificationHistory
    @histories = policy_scope(TenantNotificationHistory).order(sent_at: :desc)
    render json: @histories.as_json(
      only: %i[id subject sent_at],
      include: { tenants: { only: %i[id name email house_number property_name] } }
    )
  end

  # GET /tenant_notification_histories/:id
  def show
    @history = TenantNotificationHistory.find(params[:id])
    authorize @history
    render json: @history.as_json(
      only: %i[id subject body sent_at],
      include: { tenants: { only: %i[id name email house_number property_name] } }
    )
  end
end
