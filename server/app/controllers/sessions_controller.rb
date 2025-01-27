class SessionsController < ApplicationController
  def create
    admin = Admin.find_by(email: params[:email])

    if admin && admin.authenticate(params[:password])
      session[:admin_id] = admin.id
      render json: { message: 'Logged in successfully', admin_id: admin.id }, status: :ok
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  def destroy
    session[:admin_id] = nil
    render json: { message: 'Logged out successfully' }, status: :ok
  end
end
