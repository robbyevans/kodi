# File 10: /server/app/controllers/tenants_controller.rb

class TenantsController < ApplicationController
  before_action :set_tenant, only: [:update, :destroy]
  before_action :authorize_property_owner, only: [:create, :update, :destroy]

  def index
    @tenants = Tenant.all
    render json: @tenants
  end

  def create
    @tenant = Tenant.new(tenant_params)
    house = House.find(params[:house_id])

    if house.property.admin != current_admin
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    ActiveRecord::Base.transaction do
      @tenant.save!
      house.update!(tenant: @tenant)
    end


    render json: @tenant, status: :created
  rescue ActiveRecord::RecordInvalid
    render json: @tenant.errors, status: :unprocessable_entity
  end


  def update
    if @tenant.update(tenant_params)
      render json: @tenant, status: :ok
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tenant.destroy
    head :no_content
  end

  private

  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  def authorize_property_owner
    house = @tenant&.houses&.first || House.find(params[:house_id])
    unless house.property.admin == current_admin
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email)
  end
end
