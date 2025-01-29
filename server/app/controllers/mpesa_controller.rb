class MpesaController < ApplicationController
  require 'httparty'

  # Generate Access Token
  def generate_access_token
    response = HTTParty.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
                            basic_auth: {
                              username: ENV['MPESA_CONSUMER_KEY'],
                              password: ENV['MPESA_CONSUMER_SECRET']
                            })
    response.parsed_response['access_token']
  end

  # Register URLs
  def register_urls
    token = generate_access_token
    response = HTTParty.post('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
                             headers: { Authorization: "Bearer #{token}", 'Content-Type': 'application/json' },
                             body: {
                               ShortCode: ENV['MPESA_SHORTCODE'],
                               ResponseType: 'Completed',
                               ConfirmationURL: "#{ENV['BASE_URL']}#{ENV['CONFIRMATION_URL']}",
                               ValidationURL: "#{ENV['BASE_URL']}#{ENV['VALIDATION_URL']}"
                             }.to_json)

    render json: response.parsed_response
  end

  # Validation URL
  def validation
    render json: { ResultCode: 0, ResultDesc: 'Accepted' }
  end

  # Confirmation URL
  def confirmation
    payment = params
    house = House.find_by(house_number: payment[:BillRefNumber])

    if house && payment[:TransAmount].to_f > 0
      tenant = house.tenant
      balance = house.payable_rent - payment[:TransAmount].to_f

      # Save payment to the Mpesa payments table
      MpesaPayment.create(
        transaction_id: payment[:TransID],
        bill_ref_number: payment[:BillRefNumber],
        msisdn: payment[:MSISDN],
        transaction_amount: payment[:TransAmount].to_f,
        transaction_type: payment[:PaymentMode],
        payment_date: Time.parse(payment[:TransTime]),
        short_code: payment[:Shortcode],
        status: payment[:ResultDesc]
      )
    end

    render json: { ResultCode: 0, ResultDesc: 'Success' }
  end
end
