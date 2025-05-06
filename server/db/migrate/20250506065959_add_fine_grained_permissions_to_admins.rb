class AddFineGrainedPermissionsToAdmins < ActiveRecord::Migration[7.2]
  def change
    # self-join: each assistant points at its “manager” (a real admin)
    add_reference :admins,
                  :manager,
                  null: true,
                  foreign_key: { to_table: :admins },
                  index: true

    # add new boolean flags for assistant privileges
    change_table :admins do |t|
      # PROPERTIES
      t.boolean :can_view_properties,   default: false, null: false
      t.boolean :can_create_properties, default: false, null: false
      t.boolean :can_update_properties, default: false, null: false
      t.boolean :can_delete_properties, default: false, null: false
      # HOUSES
      t.boolean :can_view_houses,       default: false, null: false
      t.boolean :can_create_houses,     default: false, null: false
      t.boolean :can_update_houses,     default: false, null: false
      t.boolean :can_delete_houses,     default: false, null: false
      # TENANTS & LEASES
      t.boolean :can_view_tenants,      default: false, null: false
      t.boolean :can_create_tenants,    default: false, null: false
      t.boolean :can_update_tenants,    default: false, null: false
      t.boolean :can_terminate_leases,  default: false, null: false
      # FINANCES
      t.boolean :can_view_payments,     default: false, null: false
      t.boolean :can_record_payments,   default: false, null: false
      t.boolean :can_withdraw_funds,    default: false, null: false
      # NOTIFICATIONS
      t.boolean :can_send_notifications,        default: false, null: false
      t.boolean :can_view_notification_history, default: false, null: false
    end
  end
end
