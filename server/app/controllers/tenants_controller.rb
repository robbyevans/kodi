class TenantsController < ApplicationController
  before_action :set_house, only: [:index, :create, :update, :destroy]
  before_action :set_tenant, only: [:update, :destroy]
  before_action :authorize_house_owner, only: [:create, :update, :destroy]

  # Add this new action to fetch all tenants for the current admin
  def all
    @tenants = Tenant
                .joins(houses: :property)
                .where(properties: { admin_id: current_admin.id })
                .distinct
    render json: @tenants
  end


  # GET /houses/:house_id/tenants
  def index
    @tenants = @house.tenant ? [@house.tenant] : []
    render json: @tenants
  end

  # POST /houses/:house_id/tenants
  def create
    @tenant = Tenant.new(tenant_params)
    ActiveRecord::Base.transaction do
      @tenant.save!
      @house.update!(tenant: @tenant)
    end
    render json: @tenant, status: :created
  rescue ActiveRecord::RecordInvalid
    render json: @tenant.errors, status: :unprocessable_entity
  end

  # PUT/PATCH /houses/:house_id/tenants/:id
  def update
    if @tenant.update(tenant_params)
      render json: @tenant, status: :ok
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /houses/:house_id/tenants/:id
  def destroy
    @tenant.destroy
    head :no_content
  end

  private

  def set_house
    @house = House.joins(:property).where(properties: { admin_id: current_admin.id }).find(params[:house_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'House not found or unauthorized' }, status: :unauthorized
  end

  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  def authorize_house_owner
    # Now that @house is set for update/destroy, this will work as expected.
    unless @house.property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email)
  end
end
