class TenantsController < ApplicationController
  before_action :set_house, only: %i[index create update destroy]
  before_action :set_tenant, only: %i[update destroy]
  before_action :authorize_house_owner, only: %i[create update destroy]

  # GET /tenants
  # Fetch all tenants associated with houses owned by the current admin
  def all
    tenants = Tenant
              .joins(houses: :property)
              .where(properties: { admin_id: current_admin.id })
              .distinct

    render json: tenants.as_json(
      only: %i[id name email phone_number national_id],
      methods: %i[house_number property_id property_name]
    )
  end

  # GET /houses/:house_id/tenants
  # Return the tenant for a specific house, or an empty array
  def index
    tenants = @house.tenant ? [@house.tenant] : []
    render json: tenants.as_json(
      only: %i[id name email phone_number national_id],
      methods: %i[house_number property_id property_name]
    )
  end

  # POST /houses/:house_id/tenants
  def create
    if @house.payable_rent.nil? || @house.payable_rent <= 0
      return render json: { error: 'Cannot add tenant. House has no payable rent.' },
                    status: :unprocessable_entity
    end

    tenant = Tenant.new(tenant_params)
    ActiveRecord::Base.transaction do
      tenant.save!
      @house.update!(tenant: tenant)
      TenantHouseAgreement.create!(
        tenant: tenant,
        house: @house,
        property: @house.property,
        deposit: @house.payable_deposit || 0.0,
        monthly_rent: @house.payable_rent || 0.0,
        balance: 0.0,
        status: 'active'
      ).tap do |agreement|
        total = agreement.deposit + agreement.monthly_rent
        agreement.debit!(total) if total.positive?
      end
    end

    render json: tenant.as_json(
      only: %i[id name email phone_number national_id],
      methods: %i[house_number property_id property_name]
    ), status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # PUT/PATCH /houses/:house_id/tenants/:id
  def update
    if @tenant.update(tenant_params)
      render json: @tenant.as_json(
        only: %i[id name email phone_number national_id],
        methods: %i[house_number property_id property_name]
      )
    else
      render json: { errors: @tenant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /houses/:house_id/tenants/:id
  def destroy
    ActiveRecord::Base.transaction do
      agreement = TenantHouseAgreement.find_by(
        tenant_id: @tenant.id,
        house_id: @house.id,
        status: 'active'
      )
      agreement&.end_agreement!
      @house.update!(tenant_id: nil)
    end

    head :no_content
  end

  private

  def set_house
    @house = House
             .joins(:property)
             .where(properties: { admin_id: current_admin.id })
             .find(params[:house_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'House not found or unauthorized' }, status: :unauthorized
  end

  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  def authorize_house_owner
    return if @house.property.admin_id == current_admin.id

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email, :national_id)
  end
end
