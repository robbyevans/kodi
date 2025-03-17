class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
  accepts_nested_attributes_for :houses, allow_destroy: true
  has_one_attached :property_image

  # Virtual attribute to capture number of units (not persisted)
  attr_accessor :number_of_units

  # Automatically assign a unique_id starting at 1001 after creation.
  after_create :assign_unique_id
  after_commit :update_houses_account_numbers, on: :create

  def assign_unique_id
    update_column(:unique_id, (1000 + id).to_s)
  end

  # After the property is created and its unique_id is set,
  # update all the houses so that they generate a proper account_number.
  def update_houses_account_numbers
    houses.each { |house| house.save! }
  end

  def as_json(options = {})
    super(options.merge(except: [:property_image])).merge(
      unique_id: unique_id,
      property_image: property_image.attached? ?
        Rails.application.routes.url_helpers.rails_blob_url(
          property_image,
          host: Rails.application.routes.default_url_options[:host],
          port: Rails.application.routes.default_url_options[:port]
        ) : nil
    )
  end
end
