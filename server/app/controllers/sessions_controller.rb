class SessionsController < ApplicationController
  def create
    admin = Admin.find_by(email: params[:email])

    if admin && admin.authenticate(params[:password])
      session[:admin_id] = admin.id
      Rails.logger.debug "Session set: #{session[:admin_id]}"  # Debugging session
      render json: {
        message: 'Logged in successfully',
        admin_id: admin.id,
        email: admin.email,
        role: admin.role
      }, status: :ok
    else
      Rails.logger.debug "Login failed for email: #{params[:email]}"
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  def current_admin
    Rails.logger.debug "Session ID at current_admin: #{session[:admin_id]}" # Debugging session
    if admin = Admin.find_by(id: session[:admin_id])
      render json: {
        admin_id: admin.id,
        email: admin.email,
        role: admin.role
      }, status: :ok
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end
end
