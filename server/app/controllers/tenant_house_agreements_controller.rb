class TenantHouseAgreementsController < ApplicationController
  # GET /tenant_house_agreements
  def index
    authorize TenantHouseAgreement
    @agreements = policy_scope(TenantHouseAgreement)
    render json: @agreements, status: :ok
  end

  # GET /tenant_house_agreements/:id
  def show
    @agreement = TenantHouseAgreement.find(params[:id])
    authorize @agreement
    render json: @agreement
  end

  # POST /tenant_house_agreements
  def create
    @agreement = TenantHouseAgreement.new(agreement_params)
    authorize @agreement
    unless policy_scope(House).exists?(@agreement.house_id)
      return render json: { error: 'Unauthorized or invalid house' }, status: :unauthorized
    end

    if @agreement.save
      render json: @agreement, status: :created
    else
      render json: @agreement.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tenant_house_agreements/:id
  def update
    @agreement = TenantHouseAgreement.find(params[:id])
    authorize @agreement
    if @agreement.update(agreement_params)
      render json: @agreement, status: :ok
    else
      render json: @agreement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tenant_house_agreements/:id
  def destroy
    @agreement = TenantHouseAgreement.find(params[:id])
    authorize @agreement
    @agreement.destroy
    head :no_content
  end

  private

  def agreement_params
    params.require(:tenant_house_agreement).permit(
      :tenant_id, :house_id, :deposit,
      :monthly_rent, :balance, :start_date,
      :end_date, :status
    )
  end
end
