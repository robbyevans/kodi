class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
  accepts_nested_attributes_for :houses, allow_destroy: true
  has_one_attached :property_image

    # Virtual attribute to capture number of units from the form
    attr_accessor :number_of_units

    validates :name, presence: true, uniqueness: { scope: :admin_id, message: "should be unique per admin" }


  # Automatically assign a unique_id starting at 1001 after creation.
  after_create :assign_unique_id

  def assign_unique_id
    # Adding 1000 to the record's id
    update_column(:unique_id, (1000 + id).to_s)
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

