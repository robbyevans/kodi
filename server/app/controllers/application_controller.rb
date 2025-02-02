class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  # Skip authentication for the admin signup (POST /signup)
  before_action :authenticate_admin

   # Add this helper method to make current_admin accessible in controllers
   def current_admin
    @current_admin
  end
  helper_method :current_admin


  private

  def authenticate_admin
    token = request.headers['Authorization']&.split(' ')&.last

    unless token
      render json: { error: 'Token is missing' }, status: :unauthorized
      return
    end

    decoded_token = decode_jwt(token)
    unless decoded_token
      render json: { error: 'Invalid or expired token' }, status: :unauthorized
      return
    end

    @current_admin = Admin.find_by(id: decoded_token['admin_id'])
    unless @current_admin
      render json: { error: 'Admin not found' }, status: :unauthorized
    end
  end


  def encode_jwt(admin_id)
    payload = { admin_id: admin_id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end

  def decode_jwt(token)
    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      decoded.first # Return the payload hash
    rescue JWT::ExpiredSignature
      nil
    rescue JWT::DecodeError
      nil
    end
  end
end
