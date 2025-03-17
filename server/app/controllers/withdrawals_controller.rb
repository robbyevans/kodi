class WithdrawalsController < ApplicationController
  before_action :authenticate_admin

  def create
    amount = params.require(:amount).to_d
    withdrawal_service = WithdrawalService.new(current_admin, amount)

    begin
      withdrawal_service.perform
      render json: { message: "Withdrawal successful" }, status: :ok
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  def authenticate_admin
    # Your authentication logic here. For example, if you use JWT, verify token and set current_admin.
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_admin
  end
end
