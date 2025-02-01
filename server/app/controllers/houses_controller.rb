# File 3: /server/app/controllers/houses_controller.rb

class HousesController < ApplicationController
  before_action :set_house, only: [:update, :destroy]
  before_action :authorize_property_owner, only: [:create, :update, :destroy]

  def index
    @houses = House.includes(:tenant).all
    render json: @houses.as_json(include: { tenant: { only: [:id, :name, :email, :phone_number] } })
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

  private

  def set_house
    @house = House.find(params[:id])
  end

  def authorize_property_owner
    if action_name == 'create'
      property = Property.find(params[:house][:property_id])
    else
      property = @house.property
    end

    unless property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end


  def house_params
    params.require(:house).permit(:house_number, :payable_rent, :tenant_id, :property_id)
  end
end
