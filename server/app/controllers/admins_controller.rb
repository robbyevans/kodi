class AdminsController < ApplicationController
  skip_before_action :authenticate_admin, only: %i[create login google_auth]

  # POST /signup
  def create
    @admin = Admin.new(admin_params.merge(role: 'admin',
                                          is_notifications_allowed: false,
                                          is_terms_and_conditions_agreed: false))
    if @admin.save
      SmsJobs::SendVerificationSmsJob.perform_later(@admin.id)
      token = encode_jwt(@admin.id)
      render json: {
        message: 'Admin created successfully',
        token: token,
        admin: @admin.as_json
      }, status: :created
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /admins/:id
  def update
    @admin = Admin.find(params[:id])
    if @admin.update(admin_params)
      render json: @admin.as_json, status: :ok
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /admins/:id
  def destroy
    Admin.find(params[:id]).destroy
    head :no_content
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
      admin.assign_attributes(name: payload['name'], password: pw, password_confirmation: pw, role: 'admin')
      return render(json: { error: admin.errors.full_messages }, status: :unprocessable_entity) unless admin.save

      status = :created
    else
      status = :ok
    end

    render json: { token: encode_jwt(admin.id), admin: admin.as_json }, status: status
  end

  # POST /admins/send_confirmation_code
  def send_confirmation_code
    current_admin.send_confirmation_code!
    render json: { message: 'Confirmation code sent' }, status: :ok
  end

  # POST /admins/confirm_email
  # params: { code: "ABC123" }
  def confirm_email
    if current_admin.verify_confirmation_code!(params[:code])
      render json: { message: 'Email confirmed' }, status: :ok
    else
      render json: { error: 'Invalid or expired code' }, status: :unprocessable_entity
    end
  end

  private

  def admin_params
    params.require(:admin).permit(
      :name,
      :email,
      :phone_number,
      :password,
      :password_confirmation,
      :profile_image,
      :is_notifications_allowed,
      :device_token,
      :is_terms_and_conditions_agreed
    )
  end
end
