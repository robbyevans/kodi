class AdminsController < ApplicationController
  def new
    @admin = Admin.new
  end

  def create
    @admin = Admin.new(admin_params)

    if @admin.save
      session[:admin_id] = @admin.id
      redirect_to properties_path, notice: 'Admin created and logged in.'
    else
      render :new
    end
  end

  private

  def admin_params
    params.require(:admin).permit(:email, :password, :password_confirmation)
  end
end
