class RenameUniqueIdToPropertyUidInProperties < ActiveRecord::Migration[7.0]
  def change
    rename_column :properties, :unique_id, :property_uid
  end
end
