class PropertiesController < ApplicationController
  # Ensure the property is loaded first
  before_action :set_property, only: [:show, :update, :destroy]
  before_action :authorize_admin, only: [:create, :update, :destroy]

  def create
    @property = current_admin.properties.new(property_params)
    if @property.save
      render json: @property, status: :created
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def index
    @properties = current_admin.properties.includes(houses: :tenant)
    render json: @properties.as_json(
      include: {
        houses: {
          only: [:id, :house_number, :payable_rent],
          include: {
            tenant: { only: [:id, :name, :email, :phone_number] }
          }
        }
      }
    )
  end

  def show
    render json: @property.as_json(
      include: {
        houses: {
          only: [:id, :house_number, :payable_rent],
          include: {
            tenant: { only: [:id, :name, :email, :phone_number] }
          }
        }
      }
    )
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

  def set_property
    @property = Property.find(params[:id])
  end

  def property_params
    params.require(:property).permit(:name, :property_image)
  end

  def authorize_admin
    # Skip this check on creation as current_admin is used directly
    return if action_name == 'create'

    unless current_admin && current_admin.id == @property.admin_id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
