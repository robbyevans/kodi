class SessionsController < ApplicationController
  def new
    # For rendering the login form in a server-rendered application (optional).
  end

  def create
    admin = Admin.find_by(email: params[:email])

    if admin && admin.authenticate(params[:password])
      session[:admin_id] = admin.id
      respond_to do |format|
        format.html do
          redirect_to properties_path, notice: 'Logged in successfully.'
        end
        format.json do
          render json: { message: 'Logged in successfully', admin_id: admin.id }, status: :ok
        end
      end
    else
      respond_to do |format|
        format.html do
          flash.now[:alert] = 'Invalid email or password.'
          render :new
        end
        format.json do
          render json: { errors: ['Invalid email or password'] }, status: :unauthorized
        end
      end
    end
  end

  def destroy
    Rails.logger.info "Logging out admin, clearing session"
    session[:admin_id] = nil
    render json: { message: 'Logged out successfully' }, status: :ok
  end
end
