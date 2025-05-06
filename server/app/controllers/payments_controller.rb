class PaymentsController < ApplicationController
  skip_before_action :authenticate_admin, only: %i[ipn index]
  skip_before_action :verify_authenticity_token, only: :ipn

  # POST /payments/ipn
  def ipn
    Rails.logger.info "💡 Payment IPN Received: #{params.to_unsafe_h}"

    transaction_id     = params[:transaction_id]
    bill_ref_number    = params[:bill_ref_number].to_s
    msisdn             = params[:msisdn]
    # ensure we have a BigDecimal for arithmetic
    transaction_amount = BigDecimal(params[:transaction_amount].to_s)
    short_code         = params[:short_code]
    payment_date       = params[:timestamp] || Time.zone.now

    property_uid, house_no = bill_ref_number.split('#')
    property_id = (property_uid.to_i - 1000).to_s

    Rails.logger.info 'Parsed IPN values - ' \
                      "transaction_id=#{transaction_id}, " \
                      "property_uid=#{property_uid}, " \
                      "property_id=#{property_id}, " \
                      "house_no=#{house_no}"

    property = Property.find_by(id: property_id.to_i)
    house    = property&.houses&.find_by(house_number: house_no)
    settled  = property.present? && house.present?

    payment = nil
    ActiveRecord::Base.transaction do
      payment = Payment.create!(
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
      )
      Rails.logger.info "✅ Payment record created with ID: #{payment.id}"

      # Notify landlord via Firebase (if they have a device token)
      if (admin = property&.admin&.reload) && admin.device_token.present?
        Rails.logger.info "📲 Sending Firebase Notification to: #{admin.device_token}"
        FirebaseService.send_notification(
          admin.device_token,
          '💸 New Payment Received!',
          "You have received KES #{payment.transaction_amount} from #{property.name}, House #{payment.house_number}"
        )
      elsif admin
        Rails.logger.warn "⚠️ Admin #{admin.id} has no device_token"
      else
        Rails.logger.error "❌ No admin found for property ID #{payment.property_id}"
      end
    end

    render json: payment, status: :created
  rescue StandardError => e
    Rails.logger.error "❗ Payment IPN Error: #{e.message}"
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # GET /payments
  def index
    authorize Payment # PaymentPolicy#index?
    payments = policy_scope(Payment) # only payments for this acting_admin

    payments = payments.where(property_id: params[:property_ids]) if params[:property_ids]
    payments = payments.where(settled: ActiveModel::Type::Boolean.new.cast(params[:settled])) if params[:settled]

    if params[:month].present? && params[:year].present?
      payments = payments.where(
        'EXTRACT(MONTH FROM payment_date)=? AND EXTRACT(YEAR FROM payment_date)=?',
        params[:month].to_i, params[:year].to_i
      )
    elsif params[:year].present?
      payments = payments.where('EXTRACT(YEAR FROM payment_date)=?', params[:year].to_i)
    end

    render json: payments
  end

  private

  def property_for(payment)
    Property.find_by(id: payment.property_id.to_i)
  end
end
