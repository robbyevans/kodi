# File: /server/app/models/admin.rb
class Admin < ApplicationRecord
  has_secure_password
  has_one_attached :profile_image
  has_many :properties, foreign_key: 'admin_id', dependent: :destroy
  has_one :wallet, dependent: :destroy
  after_create :initialize_wallet

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true, on: :create
  validates :role, presence: true, inclusion: { in: %w[admin system_admin] }
  validates :password, length: { minimum: 4 },
                       format: { with: /[A-Z]/, message: "must include at least one uppercase letter" },
                       allow_nil: true

  def as_json(options = {})
    # Exclude the default :profile_image key if present and merge your custom key.
    super(options.merge(except: [:profile_image])).merge(
      admin_id: id,
      profile_image: profile_image.attached? ?
        Rails.application.routes.url_helpers.rails_blob_url(
          profile_image,
          host: Rails.application.routes.default_url_options[:host],
          port: Rails.application.routes.default_url_options[:port]
        ) : nil
    )
  end

  private

  def initialize_wallet
    create_wallet!(balance: 0.0)
  end
end
