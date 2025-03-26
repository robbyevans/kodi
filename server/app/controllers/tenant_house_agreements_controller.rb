class TenantHouseAgreementsController < ApplicationController
  before_action :authenticate_admin
  before_action :set_tenant_house_agreement, only: [:show, :update, :destroy]
  before_action :authorize_agreement_owner, only: [:update, :destroy]

  # GET /tenant_house_agreements
  # Optionally, fetch all agreements for the current_admin's properties
  def index
    # e.g. show all agreements for houses belonging to current_admin
    @agreements = TenantHouseAgreement
                    .joins(house: :property)
                    .where(properties: { admin_id: current_admin.id })
                    .includes(:tenant, house: :property)
    render json: @agreements, status: :ok
  end

  # GET /tenant_house_agreements/:id
  def show
    render json: @tenant_house_agreement
  end

  # POST /tenant_house_agreements
  def create
    # We'll expect the request to provide tenant_id, house_id, deposit, monthly_rent, etc.
    @agreement = TenantHouseAgreement.new(agreement_params)

    # We must verify that the house belongs to the current admin
    unless house_belongs_to_current_admin?(@agreement.house_id)
      return render json: { error: "Unauthorized or invalid house" }, status: :unauthorized
    end

    if @agreement.save
      render json: @agreement, status: :created
    else
      render json: @agreement.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tenant_house_agreements/:id
  def update
    # e.g. user can update deposit, monthly_rent, end_date, status, etc.
    if @tenant_house_agreement.update(agreement_params)
      render json: @tenant_house_agreement, status: :ok
    else
      render json: @tenant_house_agreement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tenant_house_agreements/:id
  def destroy
    @tenant_house_agreement.destroy
    head :no_content
  end

  private

  def set_tenant_house_agreement
    @tenant_house_agreement = TenantHouseAgreement.find(params[:id])
  end

  def authorize_agreement_owner
    # The house's property must belong to the current_admin
    unless @tenant_house_agreement.house.property.admin_id == current_admin.id
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def house_belongs_to_current_admin?(house_id)
    House
      .joins(:property)
      .where(properties: { admin_id: current_admin.id })
      .exists?(id: house_id)
  end

  def agreement_params
    params.require(:tenant_house_agreement).permit(
      :tenant_id,
      :house_id,
      :deposit,
      :monthly_rent,
      :balance,
      :start_date,
      :end_date,
      :status
    )
  end
end
