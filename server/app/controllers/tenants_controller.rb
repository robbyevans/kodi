class TenantsController < ApplicationController
  before_action :set_house, only: [:index, :create, :update, :destroy]
  before_action :set_tenant, only: [:update, :destroy]
  before_action :authorize_house_owner, only: [:create, :update, :destroy]

  # GET /tenants
  # Fetch all tenants associated with houses owned by the current admin
  def all
    @tenants = Tenant
                 .joins(houses: :property)
                 .where(properties: { admin_id: current_admin.id })
                 .distinct
    render json: @tenants
  end

  # GET /houses/:house_id/tenants
  # Return the tenant for a specific house, or an empty array
  def index
    @tenants = @house.tenant ? [@house.tenant] : []
    render json: @tenants
  end

  # POST /houses/:house_id/tenants
  # Create a tenant and link them to the house, including a house agreement
  def create
    
    @tenant = Tenant.new(tenant_params)

    agreement = nil 
    
    ActiveRecord::Base.transaction do
      @tenant.save!
      @house.update!(tenant: @tenant)

      # 1) Create a new active agreement between tenant and house
      agreement = TenantHouseAgreement.create!(
        tenant: @tenant,
        house: @house,
        property: @house.property,
        deposit: @house.payable_deposit || 0.0,
        monthly_rent: @house.payable_rent || 0.0,
        balance: 0.0,
        status: "active"
      )

      # 2) Deduct deposit and first rent from the agreement balance
      total_first_charge = agreement.deposit + agreement.monthly_rent
      agreement.debit!(total_first_charge) if total_first_charge.positive?
    end

    render json: @tenant, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors }, status: :unprocessable_entity
  end

  # PUT/PATCH /houses/:house_id/tenants/:id
  # Update a tenant’s information
  def update
    if @tenant.update(tenant_params)
      render json: @tenant, status: :ok
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /houses/:house_id/tenants/:id
  # "Remove" a tenant by ending the active agreement and nullifying the house's tenant
  def destroy
    ActiveRecord::Base.transaction do
      agreement = TenantHouseAgreement.find_by(
        tenant_id: @tenant.id,
        house_id: @house.id,
        status: "active"
      )

      agreement.end_agreement! if agreement.present?
      @house.update!(tenant_id: nil)
    end

    head :no_content
  end

  private

  # Ensure the house exists and belongs to the current admin
  def set_house
    @house = House.joins(:property)
                  .where(properties: { admin_id: current_admin.id })
                  .find(params[:house_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'House not found or unauthorized' }, status: :unauthorized
  end

  # Load the tenant being updated or removed
  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  # Make sure the current admin owns the house
  def authorize_house_owner
    unless @house.property.admin_id == current_admin.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # Strong params for tenant creation/update
  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email, :national_id)
  end
end
