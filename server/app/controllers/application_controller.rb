class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  skip_before_action :verify_authenticity_token

  helper_method :current_admin # Makes current_admin available in views and controllers

  def current_admin
    @current_admin ||= Admin.find_by(id: session[:admin_id])
  end
end
