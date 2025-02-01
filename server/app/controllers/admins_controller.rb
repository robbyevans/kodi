class AdminsController < ApplicationController

  # Admin creation action
  def create
    Rails.logger.debug "Admin params: #{admin_params.inspect}"
    @admin = Admin.new(admin_params)
    @admin.role = 'admin' # Default role is admin
  
    if @admin.save
      # Generate a token after successfully saving the admin
      token = encode_jwt(@admin.id)

      # Respond with the token, admin details, and message
      render json: { 
        message: 'Admin created successfully',
        token: token, # Return the token here
        email: @admin.email,
        role: @admin.role,
        admin_id: @admin.id # Include admin_id in the response
      }, status: :created
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @admin = Admin.find(params[:id])
    if @admin.update(admin_params)
      render json: @admin
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

    if admin && admin.authenticate(params[:password]) # Authenticate the admin
      # If login is successful, generate the JWT token
      token = encode_jwt(admin.id)
      
      # Respond with the token and admin details
      render json: { 
        token: token, 
        admin: { email: admin.email, role: admin.role, admin_id: admin.id }
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private
  
  def admin_params
    params.require(:admin).permit(:email, :password, :password_confirmation, :role)
  end
end
