class Property < ApplicationRecord
  belongs_to :admin
  has_many :houses, dependent: :destroy
  accepts_nested_attributes_for :houses, allow_destroy: true
  has_one_attached :property_image

  attr_accessor :number_of_units

  after_create :assign_property_uid
  after_commit :update_houses_account_numbers, on: :create

  def assign_property_uid
    update_column(:property_uid, (1000 + id).to_s)
  end

  def update_houses_account_numbers
    houses.each(&:save!)
  end

  def as_json(options = {})
    super(options.merge(except: [:property_image])).merge(
      property_uid: property_uid,
      property_image: property_image.attached? ?
        Rails.application.routes.url_helpers.rails_blob_url(
          property_image,
          host: Rails.application.routes.default_url_options[:host],
          port: Rails.application.routes.default_url_options[:port]
        ) : nil
    )
  end
end
