class CreateTenantNotificationHistories < ActiveRecord::Migration[7.2]
  def change
    create_table :tenant_notification_histories do |t|
      t.string   :subject, null: false
      t.text     :body,    null: false
      t.datetime :sent_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }
      t.references :admin, null: false, foreign_key: true

      t.timestamps
    end

    create_table :tenant_notification_recipients do |t|
      t.references :tenant_notification_history,
                   null: false,
                   foreign_key: true,
                   index: { name: 'idx_tenant_notif_recipient_history' }
      t.references :tenant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
