class RenamePropertyIdToPropertyUidInPayments < ActiveRecord::Migration[7.0]
  def change
    rename_column :payments, :property_id, :property_uid
  end
end
