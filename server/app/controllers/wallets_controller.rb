class WalletsController < ApplicationController
  before_action :authenticate_admin

  def current
    Rails.logger.info "Current Admin Wallet: #{current_admin.wallet.inspect}"
    render json: current_admin.wallet
  end
end
