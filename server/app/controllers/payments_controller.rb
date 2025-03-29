class PaymentsController < ApplicationController
  skip_before_action :authenticate_admin, only: %i[ipn index]
  skip_before_action :verify_authenticity_token, only: [:ipn]

  # POST /payments/ipn - IPN Callback
  def ipn
    transaction_id     = params[:transaction_id]
    bill_ref_number    = params[:bill_ref_number]
    msisdn             = params[:msisdn]
    transaction_amount = params[:transaction_amount]
    short_code         = params[:short_code]
    payment_date       = params[:timestamp] || Time.zone.now

    # Extract property_uid and house number from the bill reference.
    property_uid, house_no = bill_ref_number.split('#')
    # Calculate the actual property_id (property_uid is property_id + 1000).
    property_id = (property_uid.to_i - 1000).to_s

    # Use property_id to look up the actual property.
    property = Property.find_by(id: property_id.to_i)
    house    = property&.houses&.find_by(house_number: house_no)
    settled  = property.present? && house.present?

    payment_data = {
      transaction_id: transaction_id,
      bill_ref_number: bill_ref_number,
      msisdn: msisdn,
      transaction_amount: transaction_amount,
      transaction_type: 'rent',
      payment_date: payment_date,
      short_code: short_code,
      status: 'success',
      property_id: property_id,
      property_uid: property_uid,
      house_number: house_no,
      settled: settled
    }

    @payment = Payment.create!(payment_data)

    # Lookup the property using the correct property_id and get the associated admin.
    admin = property_for(@payment)&.admin

    if admin&.device_token.present?
      Rails.logger.info "📲 Sending Firebase Notification to: #{admin.device_token}"

      FirebaseService.send_notification(
        admin.device_token,
        'New Payment Received!',
        "Received KES #{@payment.transaction_amount} from House #{@payment.house_number}"
      )
    else
      Rails.logger.warn "⚠️ Skipping Firebase Notification: Admin not found or no device_token for property_id=#{@payment.property_id}"
    end

    render json: @payment, status: :created
  rescue StandardError => e
    Rails.logger.error "❗ Payment IPN Error: #{e.message}"
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
        'EXTRACT(MONTH FROM payment_date) = ? AND EXTRACT(YEAR FROM payment_date) = ?',
        params[:month].to_i, params[:year].to_i
      )
    elsif params[:year].present?
      payments = payments.where('EXTRACT(YEAR FROM payment_date) = ?', params[:year].to_i)
    end

    render json: payments
  end

  private

  def property_for(payment)
    Property.find_by(id: payment.property_id.to_i)
  end
end
