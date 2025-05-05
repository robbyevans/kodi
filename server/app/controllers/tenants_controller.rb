class TenantsController < ApplicationController
  # GET /tenants
  def all
    authorize Tenant, :index?
    @tenants = policy_scope(Tenant)
    render json: @tenants.as_json(
      only: %i[id name email phone_number national_id],
      methods: %i[house_number property_id property_name]
    )
  end

  # GET /houses/:house_id/tenants
  def index
    @house = policy_scope(House).find(params[:house_id])
    authorize @house, :show?
    tenant = @house.tenant
    render json: Array(tenant).as_json(
      only: %i[id name email phone_number national_id],
      methods: %i[house_number property_id property_name]
    )
  end

  # POST /houses/:house_id/tenants
  def create
    @house = policy_scope(House).find(params[:house_id])
    authorize @house, :update?

    if @house.payable_rent.to_d <= 0
      return render json: { error: 'Cannot add tenant. House has no payable rent.' },
                    status: :unprocessable_entity
    end

    @tenant = Tenant.new(tenant_params)
    authorize @tenant

    ActiveRecord::Base.transaction do
      @tenant.save!
      @house.update!(tenant: @tenant)

      agreement = TenantHouseAgreement.create!(
        tenant: @tenant,
        house: @house,
        property: @house.property,
        deposit: @house.payable_deposit || 0.0,
        monthly_rent: @house.payable_rent || 0.0,
        balance: 0.0,
        status: 'active'
      )

      # 💥 Fix: force the + to happen before calling positive?
      total = agreement.deposit + agreement.monthly_rent
      agreement.debit!(total) if total.positive?
    end

    render json: @tenant.as_json(
      only: %i[id name email phone_number national_id],
      methods: %i[house_number property_id property_name]
    ), status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  # PATCH/PUT /houses/:house_id/tenants/:id
  def update
    @tenant = Tenant.find(params[:id])
    authorize @tenant
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
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    ActiveRecord::Base.transaction do
      agr = TenantHouseAgreement.find_by(tenant: @tenant, house_id: params[:house_id], status: 'active')
      agr&.end_agreement!
      agr&.house&.update!(tenant_id: nil)
    end
    head :no_content
  end

  private

  def tenant_params
    params.require(:tenant).permit(:name, :phone_number, :email, :national_id)
  end
end
