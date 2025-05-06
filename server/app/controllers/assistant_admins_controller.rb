class AssistantAdminsController < ApplicationController
  # GET /assistant_admins
  def index
    authorize Admin, :index? # only full‐admins
    @assistant_admins = policy_scope(Admin).where(role: 'assistant_admin')
    render json: @assistant_admins
  end

  # POST /assistant_admins
  def create
    authorize Admin, :create? # only full‐admins
    raw_pw = SecureRandom.alphanumeric(12).tap { |s| s << 'A' }
    a = current_real_admin.assistant_admins.build(
      assistant_admin_params.merge(
        password: raw_pw,
        password_confirmation: raw_pw,
        role: 'assistant_admin'
      )
    )
    a.save!
    UserMailer.assistant_welcome_email(a, raw_pw).deliver_later
    render json: a, status: :created
  end

  # PATCH /assistant_admins/:id
  def update
    a = Admin.find(params[:id])
    authorize a # uses AssistantAdminPolicy#update?
    if a.update!(params.permit(
                   :can_manage_tenants,
                   :can_view_full_records,
                   :can_view_finances,
                   :can_send_notifications
                 ))
      render json: a, status: :ok
    else
      render json: { errors: a.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /assistant_admins/:id
  def destroy
    a = Admin.find(params[:id])
    authorize a # uses AssistantAdminPolicy#destroy?
    a.destroy!
    head :no_content
  end

  private

  def assistant_admin_params
    params.require(:assistant_admin).permit(:name, :email, :phone_number)
  end
end
