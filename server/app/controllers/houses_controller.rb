class HousesController < ApplicationController
  # GET /houses
  def all
    authorize House, :index?
    @houses = policy_scope(House).includes(:tenant)
    render json: @houses.as_json(
      only: %i[id house_number account_number payable_rent payable_deposit],
      include: {
        tenant: { only: %i[id name email phone_number national_id] },
        active_tenant_house_agreements: {
          only: %i[id balance status start_date],
          methods: [:status_label]
        }
      }
    )
  end

  # GET /properties/:property_id/houses
  def index
    @property = policy_scope(Property).find(params[:property_id])
    authorize @property, :show?
    @houses = policy_scope(@property.houses).includes(:tenant)
    render json: @houses.as_json(
      only: %i[id house_number account_number payable_rent payable_deposit],
      include: {
        tenant: { only: %i[id name email phone_number national_id] },
        active_tenant_house_agreements: {
          only: %i[id balance status start_date],
          methods: [:status_label]
        }
      }
    )
  end

  # POST /properties/:property_id/houses
  def create
    @property = policy_scope(Property).find(params[:property_id])
    authorize @property, :update?
    @house = @property.houses.new(house_params)
    authorize @house
    if @house.save
      render json: @house.as_json(
        only: %i[id house_number account_number payable_rent payable_deposit],
        include: {
          tenant: { only: %i[id name email phone_number national_id] },
          active_tenant_house_agreements: {
            only: %i[id balance status start_date],
            methods: [:status_label]
          }
        }
      ), status: :created
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /houses/:id
  def update
    @house = House.find(params[:id])
    authorize @house
    if @house.update(house_params)
      render json: @house.as_json(
        only: %i[id house_number account_number payable_rent payable_deposit],
        include: {
          tenant: { only: %i[id name email phone_number national_id] },
          active_tenant_house_agreements: {
            only: %i[id balance status start_date],
            methods: [:status_label]
          }
        }
      ), status: :ok
    else
      render json: @house.errors, status: :unprocessable_entity
    end
  end

  # DELETE /houses/:id
  def destroy
    @house = House.find(params[:id])
    authorize @house
    @house.destroy
    head :no_content
  end

  private

  def house_params
    params.require(:house).permit(:house_number, :payable_rent, :payable_deposit, :tenant_id)
  end
end
