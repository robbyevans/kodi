class HousesController < ApplicationController
  before_action :set_property, only: [:index, :create, :update, :destroy]
  before_action :set_house, only: [:update, :destroy]
  before_action :authorize_property_owner, only: [:create, :update, :destroy]

  # GET /houses (new endpoint)
  def all
    @houses = House
                .joins(:property)
                .where(properties: { admin_id: current_admin.id })
                .includes(:tenant)
    render json: @houses.as_json(
      only: [:id, :house_number, :account_number, :payable_rent, :payable_deposit],
      include: {
        tenant: { only: [:id, :name, :email, :phone_number, :national_id, :house_deposit_paid] },
        active_tenant_house_agreements: {
        only: [:id, :balance, :status, :start_date],
        methods: [:status_label]
        }
      }
    )
  end

  # GET /properties/:property_id/houses
  def index
    property = current_admin.properties.find(params[:property_id])
    @houses = property.houses.includes(:tenant)
    render json: @houses.as_json(
      only: [:id, :house_number, :account_number, :payable_rent, :payable_deposit],
      include: {
        tenant: { only: [:id, :name, :email, :phone_number, :national_id, :house_deposit_paid] },
        active_tenant_house_agreements: {
        only: [:id, :balance, :status, :start_date],
        methods: [:status_label]
        }
      }
    )
  end

  # POST /properties/:property_id/houses
  def create

        # Log Africa's Talking credentials to ensure they're loaded correctly (for testing only)
        Rails.logger.info "AFRICASTALKING_USERNAME: #{ENV['AFRICASTALKING_USERNAME']}, AFRICASTALKING_API_KEY: #{ENV['AFRICASTALKING_API_KEY']}"

    @house = @property.houses.new(house_params)
    if @house.save
      render json: @house.as_json(
        only: [:id, :house_number, :account_number, :payable_rent, :payable_deposit],
        include: {
          tenant: { only: [:id, :name, :email, :phone_number, :national_id, :house_deposit_paid] },
          active_tenant_house_agreements: {
           only: [:id, :balance, :status, :start_date],
             methods: [:status_label]
            }
        }
      ), status: :created
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /houses/:id
  def update
    if @house.update(house_params)
      render json: @house.as_json(
        only: [:id, :house_number, :account_number, :payable_rent, :payable_deposit],
        include: {
          tenant: { only: [:id, :name, :email, :phone_number, :national_id, :house_deposit_paid] },
          active_tenant_house_agreements: {
            only: [:id, :balance, :status, :start_date],
              methods: [:status_label]
             }
        }
      ), status: :ok
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  # DELETE /houses/:id
  def destroy
    @house.destroy
    head :no_content
  end

  private

  def set_property
    @property = current_admin.properties.find(params[:property_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Property not found or unauthorized' }, status: :unauthorized
  end

  def set_house
    @house = House.find(params[:id])
  end

  def authorize_property_owner
    property = params[:property_id] ? @property : @house.property
    unless property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def house_params
    # Account number is auto-generated; no need to permit it.
    params.require(:house).permit(:house_number, :payable_rent, :payable_deposit, :tenant_id)
  end
end
