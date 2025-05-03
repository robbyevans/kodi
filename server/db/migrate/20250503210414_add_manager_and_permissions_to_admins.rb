class AddManagerAndPermissionsToAdmins < ActiveRecord::Migration[7.2]
  def change
    # self-join: each assistant points at its “manager” (a real admin)
    add_reference :admins,
                  :manager,
                  null: true,
                  foreign_key: { to_table: :admins },
                  index: true

    # four new boolean flags for assistant privileges
    change_table :admins do |t|
      t.boolean :can_manage_tenants,     default: false, null: false
      t.boolean :can_view_full_records,  default: false, null: false
      t.boolean :can_view_finances,      default: false, null: false
      t.boolean :can_send_notifications, default: false, null: false
    end
  end
end
