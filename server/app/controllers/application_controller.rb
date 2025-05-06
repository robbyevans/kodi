class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  include Pundit             # → provides `authorize`, `policy_scope`, etc.
  include PermissionConcern  # → defines `set_effective_admin`

  # We want:
  #  1) authenticate_admin      → sets @current_admin from the JWT
  #  2) set_effective_admin     → sets @real_admin & adjusts @current_admin
  #
  # By default PermissionConcern injects its before_action *before* authenticate_admin,
  # so we skip that and re‐declare it *after* authentication.
  skip_before_action :set_effective_admin
  before_action     :authenticate_admin
  before_action     :set_effective_admin, if: -> { @current_admin.present? }

  helper_method :current_real_admin, :current_admin

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # Pundit’s user is always the “real” admin (full or assistant) so policies
  # can inspect `user.effective_admin`
  def pundit_user
    current_real_admin
  end

  # the logged‐in user (could be assistant or full admin)
  # @current_admin has been elevated below to the “data owner”
  attr_reader :current_admin

  # the “real” person behind the token: before any elevation
  def current_real_admin
    @real_admin || @current_admin
  end

  private

  def authenticate_admin
    token = request.headers['Authorization']&.split(' ')&.last
    return render(json: { error: 'Token is missing' }, status: :unauthorized) unless token

    payload = decode_jwt(token)
    return render(json: { error: 'Invalid or expired token' }, status: :unauthorized) unless payload

    @current_admin = Admin.find_by(id: payload['admin_id'])
    return if @current_admin

    render json: { error: 'Admin not found' }, status: :unauthorized
  end

  def user_not_authorized(exception)
    render json: {
      error: "#{exception.policy.class.to_s.underscore}.#{exception.query}"
    }, status: :forbidden
  end

  def encode_jwt(admin_id)
    payload = { admin_id: admin_id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end

  def decode_jwt(token)
    JWT.decode(token,
               Rails.application.credentials.secret_key_base,
               true,
               algorithm: 'HS256').first
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end
end
