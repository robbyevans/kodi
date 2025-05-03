class TenantNotificationHistoriesController < ApplicationController
  before_action :authenticate_admin

  def index
    histories = current_admin
                .tenant_notification_histories
                .includes(:tenants)
                .order(sent_at: :desc)

    render json: histories.as_json(
      only: %i[id subject sent_at],
      include: {
        tenants: { only: %i[id name email house_number property_name] }
      }
    )
  end

  def show
    history = current_admin
              .tenant_notification_histories
              .includes(:tenants)
              .find(params[:id])

    render json: history.as_json(
      only: %i[id subject body sent_at],
      include: {
        tenants: { only: %i[id name email house_number property_name] }
      }
    )
  end
end
