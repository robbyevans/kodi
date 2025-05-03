# app/models/admin.rb
class Admin < ApplicationRecord
  has_secure_password
  has_one_attached :profile_image
  has_many   :properties, dependent: :destroy
  has_one    :wallet, dependent: :destroy
  has_many   :tenant_notification_histories, dependent: :destroy

  after_create :initialize_wallet, :send_welcome_email

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true, on: :create
  validates :role, presence: true, inclusion: { in: %w[admin system_admin] }
  validates :password,
            length: { minimum: 4 },
            format: { with: /[A-Z]/, message: 'must include at least one uppercase letter' },
            allow_nil: true

  # --- self-referencing manager/assistant ---
  belongs_to :manager,
             class_name: 'Admin',
             optional: true

  has_many :assistant_admins,
           class_name: 'Admin',
           foreign_key: 'manager_id',
           dependent: :destroy

  ROLES = %w[admin system_admin assistant_admin].freeze
  validates :role, inclusion: { in: ROLES }

  # --- convenience predicates ---
  def real_admin?
    %w[admin system_admin].include?(role)
  end

  def assistant_admin?
    role == 'assistant_admin'
  end

  # — Confirmation code flow —
  def send_confirmation_code!
    code = SecureRandom.alphanumeric(6).upcase
    update!(
      email_confirmation_code: code,
      email_confirmation_code_sent_at: Time.current
    )
    UserMailer.confirmation_code_email(self).deliver_later
  end

  def verify_confirmation_code!(submitted_code)
    return false if email_confirmation_code_sent_at.nil? ||
                    email_confirmation_code_sent_at < 2.days.ago
    return false unless ActiveSupport::SecurityUtils.secure_compare(
      submitted_code,
      email_confirmation_code
    )

    update!(
      email_confirmed_at: Time.current,
      email_confirmation_code: nil,
      is_email_verified: true
    )
    true
  end

  # — Password reset code flow (unchanged) —
  def send_reset_password_code!
    code = SecureRandom.alphanumeric(6).upcase
    update!(reset_password_code: code, reset_password_sent_at: Time.current)
    UserMailer.reset_password_code_email(self).deliver_later
  end

  def verify_reset_password_code!(submitted_code)
    return false if reset_password_sent_at.nil? ||
                    reset_password_sent_at < 2.hours.ago

    ActiveSupport::SecurityUtils.secure_compare(submitted_code, reset_password_code)
  end

  def reset_password_with_code!(code, new_password, new_password_confirmation)
    return false unless verify_reset_password_code!(code)

    update!(password: new_password,
            password_confirmation: new_password_confirmation,
            reset_password_code: nil)
  end

  # — Monthly summaries (unchanged) —
  def monthly_start_email
    UserMailer.monthly_start_email(self).deliver_later
  end

  def monthly_end_email
    UserMailer.monthly_end_email(self).deliver_later
  end

  # — JSON output for API —
  def as_json(options = {})
    super(options.merge(except: [:profile_image])).merge(
      admin_id: id,
      is_notifications_allowed: is_notifications_allowed,
      is_terms_and_conditions_agreed: is_terms_and_conditions_agreed,
      device_token: device_token,
      email_confirmed_at: email_confirmed_at,
      is_email_verified: is_email_verified,
      profile_image: if profile_image.attached?
                       Rails.application.routes.url_helpers.rails_blob_url(
                         profile_image,
                         host: Rails.application.routes.default_url_options[:host],
                         port: Rails.application.routes.default_url_options[:port]
                       )
                     end
    )
  end

  private

  def initialize_wallet
    create_wallet!(balance: 0.0)
  end

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later
  end
end
