class HousesController < ApplicationController
  before_action :set_house, only: %i[show update destroy]

  def index
    if params[:property_id]
      @houses = House.where(property_id: params[:property_id])
    else
      @houses = House.all
    end
    render json: @houses
  end

  def show
    render json: @house
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

  def house_params
    params.require(:house).permit(:house_number, :payable_rent, :tenant_id, :property_id)
  end
end
