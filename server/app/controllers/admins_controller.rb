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
        admin: { email: admin.email, role: admin.role, admin_id: admin.id, name: admin.name, phone_number: admin.phone_number, profile_image: admin.profile_image }
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
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
