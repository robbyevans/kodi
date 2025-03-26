class PropertiesController < ApplicationController
  before_action :set_property, only: [:show, :update, :destroy]
  before_action :authorize_admin, only: [:create, :update, :destroy]

  def create
    @property = current_admin.properties.new(property_params)

    # Use the virtual attribute "number_of_units" to prefill nested house records.
    if params[:property][:number_of_units].present? && params[:property][:number_of_units].to_i > 0
      units = params[:property][:number_of_units].to_i
 # At creation, property.unique_id is not available yet; it will be set in the after_create callback.
      @property.houses_attributes = generate_houses(units)
    end

    if @property.save
      # Reload the property so that associations (houses) are available.
      @property.reload
      render json: @property.as_json(include: { houses: { only: [:id, :house_number, :payable_rent, :payable_deposit, :account_number] } }), status: :created
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def index
    @properties = current_admin.properties.includes(houses: [:tenant, :active_tenant_house_agreements])

    render json: @properties.as_json(
      include: {
        houses: {
          only: [:id, :house_number, :account_number, :payable_rent, :payable_deposit],
          include: {
            tenant: { only: [:id, :name, :email, :phone_number, :house_deposit_paid] },
            active_tenant_house_agreements: {
              only: [:id, :balance, :status, :start_date],
              methods: [:status_label]
        }
          }
        }
      }
    )
  end

  def show
    render json: @property.as_json(
      include: {
        houses: {
          only: [:id, :house_number, :payable_rent, :payable_deposit, :account_number],
          include: {
            tenant: { only: [:id, :name, :email, :phone_number, :house_deposit_paid] },
            active_tenant_house_agreements: {
              only: [:id, :balance, :status, :start_date],
              methods: [:status_label]
            }
          }
        }
      }
    )
  end

  def update
    if @property.update(property_params)
      render json: @property, status: :ok
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @property.destroy
    head :no_content
  end

  private

  def set_property
    @property = Property.find(params[:id])
  end

  def property_params
    params.require(:property).permit(
      :name, 
      :property_image,  
      :location, 
      :address, 
      :number_of_units  # Virtual attribute for prefilling houses; not persisted.
    )
  end

  # Build an array of nested attributes for houses.
 # The property_unique_id parameter is optional. When creating a new property, it will be nil.
def generate_houses(units, property_unique_id = nil)
  houses = []
  allowed_letters = %w[A B C D E F G H K M N P R S T U V W X Y Z]
  units.times do |i|
    group = i / 10                          # Each letter group represents 10 houses.
    letter = allowed_letters[group] || "X"    # Fallback if units exceed allowed groups.
    num = 101 + group * 10 + (i % 10)
     # Build the account number if property_unique_id is provided; otherwise, leave as empty string.
     account_num = property_unique_id.present? ? "#{property_unique_id}##{letter}#{num}" : "#{letter}#{num}"
     houses << { house_number: "#{letter}#{num}", payable_rent: "0", payable_deposit: "0", account_number: account_num }
  end
  houses
end


  def authorize_admin
    return if action_name == 'create'
    unless current_admin && current_admin.id == @property.admin_id
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
