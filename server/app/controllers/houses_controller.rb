class HousesController < ApplicationController
  before_action :set_house, only: [:update, :destroy]
  before_action :authorize_property_owner, only: [:create, :update, :destroy]

  def index
    # Start by scoping houses to properties owned by the current admin.
    houses = House.joins(:property).where(properties: { admin_id: current_admin.id })
    
    # Optional filtering: filter by property_id if provided.
    houses = houses.where(property_id: params[:property_id]) if params[:property_id].present?
    
    render json: houses.as_json(include: { tenant: { only: [:id, :name, :email, :phone_number] } })
  end

  def create
    @house = House.new(house_params)
    if @house.save
      render json: @house, status: :created
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  def update
    if @house.update(house_params)
      render json: @house, status: :ok
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @house.destroy
    head :no_content
  end

  private

  def set_house
    @house = House.find(params[:id])
  end

  def authorize_property_owner
    property = if action_name == 'create'
                 Property.find(params[:house][:property_id])
               else
                 @house.property
               end
    unless property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def house_params
    params.require(:house).permit(:house_number, :payable_rent, :tenant_id, :property_id)
  end
end
