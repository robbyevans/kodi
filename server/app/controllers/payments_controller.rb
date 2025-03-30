class PaymentsController < ApplicationController
  skip_before_action :authenticate_admin, only: %i[ipn index]
  skip_before_action :verify_authenticity_token, only: [:ipn]

  # POST /payments/ipn - IPN Callback
  def ipn
    Rails.logger.info "💡 Payment IPN Received: #{params.to_unsafe_h}"

    transaction_id     = params[:transaction_id]
    bill_ref_number    = params[:bill_ref_number]
    msisdn             = params[:msisdn]
    transaction_amount = params[:transaction_amount]
    short_code         = params[:short_code]
    payment_date       = params[:timestamp] || Time.zone.now

    property_uid, house_no = bill_ref_number.split('#')
    property_id = (property_uid.to_i - 1000).to_s

    Rails.logger.info "Parsed IPN values - transaction_id: #{transaction_id}, property_uid: #{property_uid}, property_id: #{property_id}, house_number: #{house_no}"

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
    Rails.logger.info "✅ Payment record created with ID: #{@payment.id}"

    # Reload the admin from the property to ensure the latest data (device_token, etc.)
    admin = property_for(@payment)&.admin&.reload

    if admin.present?
      if admin.device_token.present?
        Rails.logger.info "📲 Sending Firebase Notification to: #{admin.device_token}"
        FirebaseService.send_notification(
          admin.device_token,
          ' 💸 New Payment Received!',
          "You have received KES #{@payment.transaction_amount} from #{property.name}, House #{@payment.house_number}"
        )
      else
        Rails.logger.warn "⚠️ Admin #{admin.id} does not have a device_token registered."
      end
    else
      Rails.logger.error "❌ No admin associated with property ID #{@payment.property_id}"
    end

    render json: @payment, status: :created
  rescue StandardError => e
    Rails.logger.error "❗ Payment IPN Error: #{e.message}"
    render json: { error: e.message }, status: :unprocessable_entity
  end

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
