class PaymentsController < ApplicationController
  skip_before_action :authenticate_admin, only: [:authenticate, :add_paybill, :update_paybill, :delete_paybill, :ipn]
  skip_before_action :verify_authenticity_token, only: [:authenticate, :add_paybill, :update_paybill, :delete_paybill, :ipn]

  require 'faraday'
  require 'json'

  # Authenticate with Pesapal
  def authenticate
    response = Faraday.post("#{ENV['PESAPAL_API_URL']}/Auth/RequestToken") do |req|
      req.headers['Content-Type'] = 'application/json'
      req.body = {
        consumer_key: ENV['PESAPAL_CONSUMER_KEY'],
        consumer_secret: ENV['PESAPAL_CONSUMER_SECRET']
      }.to_json
    end

    if response.success?
      token_data = JSON.parse(response.body)
      session[:pesapal_token] = token_data['token']
      render json: token_data
    else
      render json: { error: 'Invalid or expired token', details: JSON.parse(response.body) }, status: :unauthorized
    end
  end

  # Register IPN URL for Paybill
  def add_paybill
    token = session[:pesapal_token]
    return render json: { error: 'Token is missing' }, status: :unauthorized if token.nil?

    response = Faraday.post("#{ENV['PESAPAL_API_URL']}/URLSetup/RegisterIPN") do |req|
      req.headers['Authorization'] = "Bearer #{token}"
      req.headers['Content-Type'] = 'application/json'
      req.body = {
        url: params[:ipn_url],
        ipn_notification_type: 'POST'
      }.to_json
    end

    if response.success?
      ipn_data = JSON.parse(response.body)
      render json: { message: 'Paybill added successfully', data: ipn_data }, status: :created
    else
      render json: { error: 'Failed to add Paybill', details: JSON.parse(response.body) }, status: :unprocessable_entity
    end
  end

  # Handle IPN notifications from Pesapal
  def ipn
    paybill_number = params[:merchant_reference]
    amount = params[:amount]
    payment_status = params[:status]
    transaction_id = params[:transaction_id]
    timestamp = params[:timestamp] || Time.now

    landlord = Landlord.find_by(paybill: paybill_number)

    if landlord
      Payment.create!(
        landlord_id: landlord.id,
        amount: amount,
        payment_status: payment_status,
        transaction_id: transaction_id,
        payment_date: timestamp
      )
      render json: { status: 'Payment recorded successfully' }, status: :ok
    else
      render json: { error: 'Landlord not found' }, status: :not_found
    end
  end
end