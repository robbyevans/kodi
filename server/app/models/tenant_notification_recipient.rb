class TenantNotificationRecipient < ApplicationRecord
  belongs_to :tenant_notification_history
  belongs_to :tenant
end
