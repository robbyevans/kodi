class AssistantAdminsController < ApplicationController
  before_action :authenticate_admin
  before_action :ensure_real_admin!

  # GET /assistant_admins
  def index
    render json: current_admin.assistant_admins
  end

  # POST /assistant_admins
  def create
    raw_pw = SecureRandom.alphanumeric(12).tap { |s| s << 'A' }
    a = current_admin.assistant_admins.build(
      assistant_admin_params
        .merge(password: raw_pw,
               password_confirmation: raw_pw,
               role: 'assistant_admin')
    )

    a.save!
    UserMailer.assistant_welcome_email(a, raw_pw).deliver_later
    render json: a, status: :created
  end

  # PATCH /assistant_admins/:id
  def update
    a = current_admin.assistant_admins.find(params[:id])
    a.update!(params.permit(
                :can_manage_tenants,
                :can_view_full_records,
                :can_view_finances,
                :can_send_notifications,
                :active
              ))
    head :no_content
  end

  # DELETE /assistant_admins/:id
  def destroy
    current_admin.assistant_admins.find(params[:id]).destroy!
    head :no_content
  end

  private

  def assistant_admin_params
    params.require(:assistant_admin)
          .permit(:name, :email, :phone_number)
  end

  def ensure_real_admin!
    head :forbidden unless current_admin.real_admin?
  end
end
