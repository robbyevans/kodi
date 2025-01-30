class AdminsController < ApplicationController
  before_action :authorize_super_admin, only: [:create]

  def create
    @admin = Admin.new(admin_params)
    @admin.role = 'admin' # Default role is admin
  
    if @admin.save
      render json: { 
        message: 'Admin created successfully',
        email: @admin.email,
        role: @admin.role,
        admin_id: @admin.id # Include admin_id in the response
      }, status: :created
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def admin_params
    params.require(:admin).permit(:email, :password, :password_confirmation, :role)
  end

  def authorize_system_admin
    unless current_admin&.role == 'system_admin'
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
