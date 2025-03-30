class AdminsController < ApplicationController
  skip_before_action :authenticate_admin, only: %i[create login google_auth]

  # Admin creation action
  def create
    Rails.logger.debug "Admin params: #{admin_params.inspect}"
    @admin = Admin.new(admin_params)
    @admin.role = 'admin'
    @admin.is_notifications_allowed = false
    @admin.is_terms_and_conditions_agreed = false

    if @admin.save
      token = encode_jwt(@admin.id)
      render json: {
        message: 'Admin created successfully',
        token: token,
        admin: @admin.as_json # Returns full admin record including device_token
      }, status: :created
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @admin = Admin.find(params[:id])
    if @admin.update(admin_params)
      render json: @admin.as_json # Full admin record returned
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @admin = Admin.find(params[:id])
    @admin.destroy
    head :no_content
  end

  # Admin login action
  def login
    admin = Admin.find_by(email: params[:email])
    if admin && admin.authenticate(params[:password])
      token = encode_jwt(admin.id)
      render json: {
        token: token,
        admin: admin.as_json # Returns full admin record
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # Admin google login/signup
  def google_auth
    token = params[:token]
    validator = GoogleIDToken::Validator.new
    begin
      payload = validator.check(token, ENV['GOOGLE_CLIENT_ID'])
    rescue GoogleIDToken::ValidationError => e
      Rails.logger.error "Google token validation error: #{e}"
      render json: { error: 'Invalid Google token' }, status: :unauthorized and return
    end

    email = payload['email']
    name  = payload['name']
    admin = Admin.find_by(email: email)

    if admin.nil?
      random_password = "#{SecureRandom.alphanumeric(9)}A"
      admin = Admin.new(
        email: email,
        name: name,
        password: random_password,
        password_confirmation: random_password,
        role: 'admin'
      )
      unless admin.save
        render json: { error: admin.errors.full_messages.join(', ') },
               status: :unprocessable_entity and return
      end

      status_code = :created
    else
      status_code = :ok
    end

    jwt = encode_jwt(admin.id)
    render json: {
      token: jwt,
      admin: admin.as_json # Returns full admin record
    }, status: status_code
  end

  private
  
  def admin_params
    params.require(:admin).permit(
      :name, :email, :phone_number, :password, :profile_image,
      :is_notifications_allowed, :device_token, :is_terms_and_conditions_agreed
    )
  end
end
