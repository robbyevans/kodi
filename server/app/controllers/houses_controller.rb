class HousesController < ApplicationController
  before_action :set_property, only: [:index, :create, :update, :destroy]
  before_action :set_house, only: [:update, :destroy]
  before_action :authorize_property_owner, only: [:create, :update, :destroy]

  # GET /houses (new endpoint)
  def all
    # Get houses for all properties owned by the current admin.
    @houses = House
                .joins(:property)
                .where(properties: { admin_id: current_admin.id })
                .includes(:tenant)
    render json: @houses.as_json(include: { tenant: { only: [:id, :name, :email, :phone_number, :national_id, :house_deposit_paid] } })
  end

  # GET /properties/:property_id/houses
  def index
    # Ensure that the property belongs to the current admin:
    property = current_admin.properties.find(params[:property_id])
    @houses = property.houses.includes(:tenant)
    render json: @houses.as_json(include: { tenant: { only: [:id, :name, :email, :phone_number,:national_id, :house_deposit_paid] } })
  end

  # POST /properties/:property_id/houses
  def create
    # Because the URL provides property_id, we use the associated property directly:
    @house = @property.houses.new(house_params)
    if @house.save
      render json: @house, status: :created
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /houses/:id
  def update
    if @house.update(house_params)
      render json: @house, status: :ok
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
    # Look up the property via the nested parameter and ensure it belongs to current_admin
    @property = current_admin.properties.find(params[:property_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Property not found or unauthorized' }, status: :unauthorized
  end

  def set_house
    @house = House.find(params[:id])
  end

  def authorize_property_owner
    # When creating, @property is already set by set_property
    # When updating/deleting, check that the house's property belongs to the current admin
    property = params[:property_id] ? @property : @house.property
    unless property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def house_params
    # Permit the new payable_deposit parameter along with existing ones.
    params.require(:house).permit(:house_number, :payable_rent, :payable_deposit, :tenant_id)
  end
end
