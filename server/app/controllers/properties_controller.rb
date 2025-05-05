class PropertiesController < ApplicationController
  # Load @property for show, update, destroy
  before_action :set_property, only: %i[show update destroy]

  # GET /properties
  def index
    # Fetch only those properties the acting_admin is allowed to see
    @properties = policy_scope(Property)
                  .includes(houses: %i[tenant active_tenant_house_agreements])
    authorize Property # PropertyPolicy#index?

    render json: @properties.as_json(
      include: {
        houses: {
          only: %i[id house_number account_number payable_rent payable_deposit],
          include: {
            tenant: { only: %i[id name email phone_number] },
            active_tenant_house_agreements: {
              only: %i[id balance status start_date],
              methods: [:status_label]
            }
          }
        }
      }
    )
  end

  # GET /properties/:id
  def show
    authorize @property # PropertyPolicy#show?
    render json: @property.as_json(
      include: {
        houses: {
          only: %i[id house_number payable_rent payable_deposit account_number],
          include: {
            tenant: { only: %i[id name email phone_number] },
            active_tenant_house_agreements: {
              only: %i[id balance status start_date],
              methods: [:status_label]
            }
          }
        }
      }
    )
  end

  # POST /properties
  def create
    @property = current_admin.properties.new(property_params)
    authorize @property # PropertyPolicy#create?

    # Generate houses if requested
    if params[:property][:number_of_units].present? && params[:property][:number_of_units].to_i.positive?
      @property.houses_attributes = generate_houses(params[:property][:number_of_units].to_i)
    end

    if @property.save
      @property.reload
      render json: @property.as_json(
        include: {
          houses: { only: %i[id house_number payable_rent payable_deposit account_number] }
        }
      ), status: :created
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /properties/:id
  def update
    authorize @property # PropertyPolicy#update?
    if @property.update(property_params)
      render json: @property, status: :ok
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  # DELETE /properties/:id
  def destroy
    authorize @property # PropertyPolicy#destroy?
    @property.destroy
    head :no_content
  end

  private

  def set_property
    @property = Property.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Property not found' }, status: :not_found
  end

  def property_params
    params.require(:property).permit(:name, :property_image, :location, :address, :number_of_units)
  end

  def generate_houses(units)
    houses = []
    allowed_letters = %w[A B C D E F G H K M N P R S T U V W X Y Z]
    units.times do |i|
      group  = i / 10
      letter = allowed_letters[group] || 'X'
      num    = 101 + group * 10 + (i % 10)
      houses << { house_number: "#{letter}#{num}", payable_rent: '0', payable_deposit: '0' }
    end
    houses
  end
end
