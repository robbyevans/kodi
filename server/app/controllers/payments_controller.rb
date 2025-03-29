class PaymentsController < ApplicationController
  skip_before_action :authenticate_admin, only: [:ipn, :index]
  skip_before_action :verify_authenticity_token, only: [:ipn]

  # Existing IPN action remains unchanged...
  def ipn
    transaction_id       = params[:transaction_id]
    bill_ref_number      = params[:bill_ref_number]  # e.g., "9010#A101"
    msisdn               = params[:msisdn]
    transaction_amount   = params[:transaction_amount]
    short_code           = params[:short_code]
    payment_date         = params[:timestamp] || Time.zone.now

    property_uid, house_no = bill_ref_number.split('#')
    property = Property.find_by(unique_id: property_uid)
    house    = property.present? ? property.houses.find_by(house_number: house_no) : nil
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
      property_id:        property_uid,
      house_number:       house_no,
      settled:            settled
    }

    Payment.create!(payment_data)
    render json: payment_data, status: :ok
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def index
    payments = Payment.all
  
    # Filter by multiple property_ids if provided
    if params[:property_ids].present?
      payments = payments.where(property_id: params[:property_ids])
    elsif params[:property_id].present?
      payments = payments.where(property_id: params[:property_id])
    end
  
    # Filter by settled status if provided
    if params[:settled].present?
      settled_value = ActiveModel::Type::Boolean.new.cast(params[:settled])
      payments = payments.where(settled: settled_value)
    end
  
    # Optional month/year filter
    if params[:month].present? && params[:year].present?
      payments = payments.where("EXTRACT(MONTH FROM payment_date) = ? AND EXTRACT(YEAR FROM payment_date) = ?",
                                params[:month].to_i, params[:year].to_i)
    elsif params[:year].present?
      payments = payments.where("EXTRACT(YEAR FROM payment_date) = ?", params[:year].to_i)
    end
  
    render json: payments
  end  
  

    # Permit both :settled and :bill_ref_number from the `payment` hash
    def update
      payment = Payment.find(params[:id])
      was_unsettled = !payment.settled?
    
      update_params = params.require(:payment).permit(:settled, :bill_ref_number, :house_number)
    
      if payment.update(update_params)
        # 👇🏽 If this payment was previously unsettled, and now it's settled, credit wallet + agreement
        if was_unsettled && payment.settled?
          property = Property.find_by(unique_id: payment.property_id)
          house = property&.houses&.find_by(house_number: payment.house_number)
    
          if property && house
            # 1. Credit tenant agreement
            agreement = TenantHouseAgreement.find_by(
              house_id: house.id,
              property_id: house.property_id,
              status: "active"
            )
            agreement&.credit!(payment.transaction_amount)
    
            # 2. Credit wallet & ledger
            wallet = property.admin.wallet
            wallet.with_lock do
              wallet.credit!(payment.transaction_amount)
    
              LedgerEntry.create!(
                admin: property.admin,
                wallet: wallet,
                transaction_type: "deposit",
                amount: payment.transaction_amount,
                balance_after: wallet.balance,
                description: "Settled payment (Payment ID: #{payment.transaction_id})"
              )
            end
          end
        end
    
        render json: payment, status: :ok
      else
        render json: payment.errors, status: :unprocessable_entity
      end
    end
    
  

end
