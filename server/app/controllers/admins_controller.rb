class AdminsController < ApplicationController
  
  skip_before_action :authenticate_admin, only: [:create, :login, :google_auth] 

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
        admin: { 
          email: @admin.email,
          role: @admin.role,
          admin_id: @admin.id,
          name: @admin.name,
          profile_image: @admin.profile_image,
          phone_number: @admin.phone_number
        }
      }, status: :created
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def update
    @admin = Admin.find(params[:id])
    if @admin.update(admin_params)
      render json: @admin.as_json   # explicitly call as_json here as well
    else
      render json: @admin.errors, status: :unprocessable_entity
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
        admin: admin.as_json   # explicitly call as_json here
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  #Admin google login/signup
  def google_auth
    token = params[:token]
  
    # Verify the token with Google
    validator = GoogleIDToken::Validator.new
    begin
      # ENV['GOOGLE_CLIENT_ID'] should match the frontend client ID
      payload = validator.check(token, ENV['GOOGLE_CLIENT_ID'])
    rescue GoogleIDToken::ValidationError => e
      Rails.logger.error "Google token validation error: #{e}"
      render json: { error: "Invalid Google token" }, status: :unauthorized and return
    end
  
    # Extract the email and name from the payload
    email = payload["email"]
    name  = payload["name"]
  
    # Look for an existing admin by email
    admin = Admin.find_by(email: email)
  
    if admin.nil?
      # Admin doesn't exist: auto-create the account
      # Generate a random password that meets complexity by ensuring at least one uppercase letter.
      random_password = "#{SecureRandom.alphanumeric(9)}A"  # 10 characters, always ending with an uppercase 'A'
      admin = Admin.new(
        email: email,
        name: name,
        password: random_password,
        password_confirmation: random_password,
        role: "admin"
      )
      unless admin.save
        render json: { error: admin.errors.full_messages.join(", ") }, status: :unprocessable_entity and return
      end
      status_code = :created
    else
      status_code = :ok
    end
  
    # Generate and return your JWT (from your own auth system)
    jwt = encode_jwt(admin.id)
    render json: {
      token: jwt,
      admin: admin.as_json(only: [:email, :name, :role, :id, :profile_image, :phone_number])
    }, status: status_code
  end
  
  

  private
  
  def admin_params
    if action_name == 'create'
      params.require(:admin).permit(:name, :email,:phone_number, :password, :password_confirmation, :role)
    else
      params.require(:admin).permit(
        :name,
        :phone_number,
        :profile_image,
        :password,
        :password_confirmation,
        :is_notifications_allowed,
        :is_terms_and_conditions_agreed
      )
    end
  end
  
end
