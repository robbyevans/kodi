class TenantsController < ApplicationController
  before_action :set_tenant, only: %i[show update destroy]

  def index
    @tenants = Tenant.all
    render json: @tenants
  end

  def show
    render json: @tenant
  end

  def create
    @tenant = Tenant.new(tenant_params)

    if @tenant.save
      render json: @tenant, status: :created
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
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

  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email)
  end
end
