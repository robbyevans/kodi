class HousesController < ApplicationController
  before_action :authorize_property_owner, only: [:create, :update, :destroy]

  def index
    if params[:property_id]
      @houses = House.where(property_id: params[:property_id]).includes(:tenant)
    else
      @houses = House.includes(:tenant).all
    end
    render json: @houses.as_json(include: { tenant: { only: [:id, :name, :email, :phone_number] } })
  end

  def show
    render json: @house.as_json(include: { tenant: { only: [:id, :name, :email, :phone_number] } })
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

  def authorize_property_owner
    property = Property.find(params[:property_id])
    unless property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def set_house
    @house = House.find(params[:id])
  end

  def house_params
    params.require(:house).permit(:house_number, :payable_rent, :tenant_id, :property_id)
  end
end
