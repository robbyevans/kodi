class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy

  has_one_attached :property_image

  validates :name, presence: true, uniqueness: { scope: :admin_id, message: "should be unique per admin" }

  def as_json(options = {})
  super(options).merge(
    property_image: property_image.attached? ?
      Rails.application.routes.url_helpers.rails_blob_url(
        property_image,
        host: Rails.application.routes.default_url_options[:host],
        port: Rails.application.routes.default_url_options[:port]
      ) : nil
  )
end

end
