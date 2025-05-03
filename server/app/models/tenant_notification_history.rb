class TenantNotificationHistory < ApplicationRecord
  belongs_to :admin
  has_many   :tenant_notification_recipients, dependent: :destroy
  has_many   :tenants, through: :tenant_notification_recipients
end
