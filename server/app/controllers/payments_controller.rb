class PaymentsController < ApplicationController
  skip_before_action :authenticate_admin, only: [:ipn, :index]
  skip_before_action :verify_authenticity_token, only: [:ipn]

  # IPN action
  def ipn
    transaction_id     = params[:transaction_id]
    bill_ref_number    = params[:bill_ref_number]  # e.g., "1002#A101"
    msisdn             = params[:msisdn]
    transaction_amount = params[:transaction_amount]
    short_code         = params[:short_code]
    payment_date       = params[:timestamp] || Time.zone.now

    property_uid, house_no = bill_ref_number.split('#')
    property_id = (property_uid.to_i - 1000).to_s

    property = Property.find_by(property_uid: property_uid)
    house    = property&.houses&.find_by(house_number: house_no)
    settled  = property.present? && house.present?

    payment_data = {
      transaction_id:     transaction_id,
      bill_ref_number:    bill_ref_number,
      msisdn:             msisdn,
      transaction_amount: transaction_amount,
      transaction_type:   "rent",
      payment_date:       payment_date,
      short_code:         short_code,
      status:             "success",
      property_id:        property_id,
      property_uid:       property_uid,
      house_number:       house_no,
      settled:            settled
    }

    Payment.create!(payment_data)
    render json: payment_data, status: :ok
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # GET /payments
  def index
    payments = Payment.all

    if params[:property_ids].present?
      payments = payments.where(property_id: params[:property_ids])
    elsif params[:property_id].present?
      payments = payments.where(property_id: params[:property_id])
    end

    if params[:settled].present?
      settled_value = ActiveModel::Type::Boolean.new.cast(params[:settled])
      payments = payments.where(settled: settled_value)
    end

    if params[:month].present? && params[:year].present?
      payments = payments.where(
        "EXTRACT(MONTH FROM payment_date) = ? AND EXTRACT(YEAR FROM payment_date) = ?",
        params[:month].to_i, params[:year].to_i
      )
    elsif params[:year].present?
      payments = payments.where("EXTRACT(YEAR FROM payment_date) = ?", params[:year].to_i)
    end

    render json: payments
  end

end
