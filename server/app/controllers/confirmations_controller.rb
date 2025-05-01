# app/controllers/confirmations_controller.rb

class ConfirmationsController < ApplicationController
  skip_before_action :authenticate_admin

  # app/controllers/confirmations_controller.rb
  def edit
    admin = Admin.find_by(email_confirmation_code: params[:token])
    if admin&.email_confirmation_code_sent_at&.>(2.days.ago)
      admin.update!(
        email_confirmed_at: Time.current,
        email_confirmation_code: nil,
        email_confirmation_code_sent_at: nil,
        is_email_verified: true
      )
      render json: { message: 'Email confirmed' }, status: :ok
    else
      render json: { error: 'Invalid or expired token' }, status: :unprocessable_entity
    end
  end
end
