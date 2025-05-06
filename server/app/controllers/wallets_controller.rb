class WalletsController < ApplicationController
  # GET /wallets/current
  def current
    wallet = current_admin.wallet
    authorize wallet, :show?
    render json: wallet
  end
end
