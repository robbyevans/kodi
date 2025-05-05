class WithdrawalsController < ApplicationController
  # POST /withdrawals
  def create
    authorize Withdrawal
    payload           = params.permit(:amount, :withdrawal_type, recipient_details: {})
    amount            = payload[:amount].to_d
    withdrawal_type   = payload[:withdrawal_type]
    recipient_details = payload[:recipient_details] || {}

    withdrawal_service = WithdrawalService.new(current_admin, amount, withdrawal_type, recipient_details)
    withdrawal_service.perform

    render json: { message: 'Withdrawal successful' }, status: :ok
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
