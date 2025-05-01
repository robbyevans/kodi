# app/controllers/password_resets_controller.rb

class PasswordResetsController < ApplicationController
  skip_before_action :authenticate_admin

  # POST /password_resets
  # { email: "you@domain.com" }
  def create
    admin = Admin.find_by(email: params[:email])
    admin&.send_reset_password_code!
    render json: {
      message: 'If that email exists, you’ll receive a reset code shortly'
    }, status: :ok
  end

  # POST /password_resets/verify
  # { email: "...", code: "ABC123" }
  def verify
    admin = Admin.find_by(email: params[:email])
    if admin&.verify_reset_password_code!(params[:code])
      render json: { message: 'Code valid' }, status: :ok
    else
      render json: { error: 'Invalid or expired code' }, status: :unprocessable_entity
    end
  end

  # POST /password_resets/reset
  # { email: "...", code: "ABC123", password: "NewPass1", password_confirmation: "NewPass1" }
  def reset
    admin = Admin.find_by(email: params[:email])
    if admin&.reset_password_with_code!(
         params[:code],
         params[:password],
         params[:password_confirmation]
       )
      render json: { message: 'Password has been reset' }, status: :ok
    else
      render json: { error: admin.errors.full_messages.to_sentence },
             status: :unprocessable_entity
    end
  end
end
