# File 4: /server/app/controllers/properties_controller.rb

class PropertiesController < ApplicationController
  before_action :authorize_admin, only: [:create, :update, :destroy]
  before_action :set_property, only: [:show, :update, :destroy]

  def index
    @properties = Property.includes(:houses).all
    render json: @properties.as_json(include: { houses: { only: [:id, :house_number, :payable_rent] } })
  end

  def create
    @property = current_admin.properties.new(property_params)

    if @property.save
      render json: @property, status: :created
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def update
    if @property.update(property_params)
      render json: @property, status: :ok
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @property.destroy
    head :no_content
  end

  private

  def property_params
    params.require(:property).permit(:name) # Remove :admin_id from permitted params
  end

  def authorize_admin
    return if action_name == 'create' # Creation is authorized via current_admin

    unless current_admin && current_admin.id == @property.admin_id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
