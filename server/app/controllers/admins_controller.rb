# server/app/controllers/admins_controller.rb
class AdminsController < ApplicationController
  skip_before_action :authenticate_admin, only: %i[create login google_auth]
  skip_before_action :set_effective_admin, only: %i[create login google_auth]
  before_action      :set_admin, only: %i[current send_confirmation_code confirm_email update destroy]

  # GET /admins
  def index
    authorize Admin
    @admins = policy_scope(Admin)
    render json: @admins
  end

  # POST /signup
  # Public endpoint to create a new full-admin account
  def create
    @admin = Admin.new(admin_create_params.merge(
                         role: 'admin',
                         is_notifications_allowed: false,
                         is_terms_and_conditions_agreed: false
                       ))
    if @admin.save
      SmsJobs::SendVerificationSmsJob.perform_later(@admin.id)
      token = encode_jwt(@admin.id)
      render json: { message: 'Admin created successfully', token:, admin: @admin.as_json }, status: :created
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    admin = Admin.find_by(email: params[:email])
    if admin&.authenticate(params[:password])
      render json: { token: encode_jwt(admin.id), admin: admin.as_json }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # POST /auth/google
  def google_auth
    validator = GoogleIDToken::Validator.new
    begin
      payload = validator.check(params[:token], ENV['GOOGLE_CLIENT_ID'])
    rescue GoogleIDToken::ValidationError
      return render json: { error: 'Invalid Google token' }, status: :unauthorized
    end

    admin = Admin.find_or_initialize_by(email: payload['email'])
    if admin.new_record?
      pw = SecureRandom.alphanumeric(9).tap { |s| s << 'A' }
      admin.assign_attributes(name: payload['name'],
                              password: pw,
                              password_confirmation: pw,
                              role: 'admin')
      unless admin.save
        return render(json: { error: admin.errors.full_messages },
                      status: :unprocessable_entity)
      end

      status_code = :created
    else
      status_code = :ok
    end

    render json: { token: encode_jwt(admin.id), admin: admin.as_json },
           status: status_code
  end

  # GET /admins/current
  def current
    render json: current_real_admin.as_json, status: :ok
  end

  # POST /admins/send_confirmation_code
  def send_confirmation_code
    authorize @admin
    @admin.send_confirmation_code!
    render json: { message: 'Confirmation code sent' }, status: :ok
  end

  # POST /admins/confirm_email
  def confirm_email
    authorize @admin
    if @admin.verify_confirmation_code!(params[:code])
      render json: { message: 'Email confirmed' }, status: :ok
    else
      render json: { error: 'Invalid or expired code' }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /admins/:id
  def update
    authorize @admin
    if @admin.update(admin_update_params)
      render json: @admin.as_json, status: :ok
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /admins/:id
  def destroy
    authorize @admin
    @admin.destroy
    head :no_content
  end

  private

  def set_admin
    @admin = Admin.find(params[:id])
  end

  # Strong params for signup — always full‐admin creation
  def admin_create_params
    params.require(:admin).permit(
      :name,
      :email,
      :phone_number,
      :password,
      :password_confirmation,
      :profile_image,
      :device_token
    )
  end

  # Strong params for update:
  # - assistant_admins may only change their password and profile_image
  # - real_admins may change **any** attribute
  def admin_update_params
    if current_real_admin.assistant_admin?
      params.require(:admin).permit(
        :password,
        :password_confirmation,
        :profile_image
      )
    else
      params.require(:admin).permit(
        :name,
        :email,
        :phone_number,
        :password,
        :password_confirmation,
        :profile_image,
        :is_notifications_allowed,
        :device_token,
        :is_terms_and_conditions_agreed,
        :role,
        :manager_id,
        :can_view_properties,
        :can_create_properties,
        :can_update_properties,
        :can_delete_properties,
        :can_view_houses,
        :can_create_houses,
        :can_update_houses,
        :can_delete_houses,
        :can_view_tenants,
        :can_create_tenants,
        :can_update_tenants,
        :can_terminate_leases,
        :can_view_payments,
        :can_record_payments,
        :can_withdraw_funds,
        :can_send_notifications,
        :can_view_notification_history
      )
    end
  end
end
