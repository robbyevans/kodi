class AdminsController < ApplicationController
  
  skip_before_action :authenticate_admin, only: [:create, :login] 

  # Admin creation action
  def create
    Rails.logger.debug "Admin params: #{admin_params.inspect}"
    @admin = Admin.new(admin_params)
    @admin.role = 'admin'  # Default role is admin
  
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
    mode  = params[:mode]

    # Verify the token with Google.
    # Ensure you have added gem 'google-id-token' to your Gemfile and run `bundle install`
    validator = GoogleIDToken::Validator.new
    begin
      # ENV['GOOGLE_CLIENT_ID'] should be set in your server environment
      payload = validator.check(token, ENV['GOOGLE_CLIENT_ID'])
    rescue GoogleIDToken::ValidationError => e
      Rails.logger.error "Google token validation error: #{e}"
      render json: { error: "Invalid Google token" }, status: :unauthorized and return
    end

    # Extract info from the payload
    email = payload["email"]
    name  = payload["name"]

    if mode == "signup"
      # If the admin already exists, prompt them to log in instead
      if Admin.exists?(email: email)
        render json: { error: "Admin already exists. Please login." }, status: :unprocessable_entity and return
      else
        # Create a new admin. Generate a random password since Google users won't use it.
        random_password = SecureRandom.hex(10)
        admin = Admin.new(
          email: email,
          name: name,
          password: random_password,
          password_confirmation: random_password,
          role: "admin"
        )
        if admin.save
          jwt = encode_jwt(admin.id)
          render json: { token: jwt, admin: admin.as_json(only: [:email, :name, :role, :id, :profile_image, :phone_number]) }, status: :created and return
        else
          render json: { error: admin.errors.full_messages.join(", ") }, status: :unprocessable_entity and return
        end
      end
    elsif mode == "login"
      admin = Admin.find_by(email: email)
      unless admin
        render json: { error: "Admin not found. Please signup first." }, status: :unauthorized and return
      end
      jwt = encode_jwt(admin.id)
      render json: { token: jwt, admin: admin.as_json(only: [:email, :name, :role, :id, :profile_image, :phone_number]) }, status: :ok and return
    else
      render json: { error: "Invalid mode parameter" }, status: :bad_request and return
    end
  end
  

  private
  
def admin_params
  # For create, require name, email, password, password_confirmation.
  # For update, permit phone_number, name, profile_image, and optionally password fields.
  if action_name == 'create'
    params.require(:admin).permit(:name, :email, :password, :password_confirmation, :role)
  else
    params.require(:admin).permit(:name, :phone_number, :profile_image, :password, :password_confirmation)
  end
end
end
