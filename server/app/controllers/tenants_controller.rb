class TenantsController < ApplicationController
  before_action :set_house, only: [:index, :create]
  before_action :set_tenant, only: [:update, :destroy]
  before_action :authorize_house_owner, only: [:create, :update, :destroy]

  # GET /houses/:house_id/tenants
  def index
    # This will list the tenant for the house (if any) or you could list all tenants
    # For now, we assume a house has at most one tenant.
    @tenants = @house.tenant ? [@house.tenant] : []
    render json: @tenants
  end

  # POST /houses/:house_id/tenants
  def create
    @tenant = Tenant.new(tenant_params)
    # Check that the house belongs to the current admin is done in authorize_house_owner
    ActiveRecord::Base.transaction do
      @tenant.save!
      # Associate the tenant with the house
      @house.update!(tenant: @tenant)
    end
    render json: @tenant, status: :created
  rescue ActiveRecord::RecordInvalid
    render json: @tenant.errors, status: :unprocessable_entity
  end

  # PUT/PATCH /tenants/:id
  def update
    if @tenant.update(tenant_params)
      render json: @tenant, status: :ok
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tenants/:id
  def destroy
    @tenant.destroy
    head :no_content
  end

  private

  def set_house
    # Look up the house from the nested URL parameter and ensure it belongs to the current admin.
    @house = House.joins(:property).where(properties: { admin_id: current_admin.id }).find(params[:house_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'House not found or unauthorized' }, status: :unauthorized
  end

  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  def authorize_house_owner
    # Ensure that the house associated with the tenant action belongs to current_admin.
    unless @house.property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email)
  end
end
