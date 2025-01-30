# app/controllers/payments_controller.rb
class PaymentsController < ApplicationController
  before_action :initialize_pesapal_service

  # Endpoint to request a token from PesaPal
  def authenticate
    token_response = @pesapal_service.request_token

    if token_response.present?
      # Handle the token response, e.g., save it to your database or use it in further API calls
      render json: { token: token_response}
    else
      render json: { error: 'Failed to authenticate with PesaPal' }, status: :unprocessable_entity
    end
  end

  # Endpoint to create a payment request
  def create_payment
    payment_details = {
      amount: params[:amount],
      currency: params[:currency] || 'KES', # Default to Kenyan Shilling
      description: params[:description] || 'Test Payment',
      callback_url: params[:callback_url] || 'https://yourwebsite.com/callback',
      redirect_url: params[:redirect_url] || 'https://yourwebsite.com/redirect',
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email]
    }

    payment_response = @pesapal_service.create_payment(payment_details)

    if payment_response
      # Redirect the user to the PesaPal payment page
      redirect_to payment_response['redirect_url']
    else
      render json: { error: 'Failed to create payment' }, status: :unprocessable_entity
    end
  end

  # Endpoint to check the status of a payment
  def payment_status
    order_id = params[:order_id]
    status_response = @pesapal_service.check_payment_status(order_id)

    if status_response
      render json: { status: status_response['status'] }
    else
      render json: { error: 'Failed to check payment status' }, status: :unprocessable_entity
    end
  end

  private

  # Initialize the PesaPalService based on the environment
  def initialize_pesapal_service
    @pesapal_service = PesapalService.new(ENV['APP_ENVIRONMENT'] || 'sandbox')
  end
end