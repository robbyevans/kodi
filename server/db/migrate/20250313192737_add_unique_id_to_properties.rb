class AddUniqueIdToProperties < ActiveRecord::Migration[7.2]
  def change
    add_column :properties, :unique_id, :string
    add_index :properties, :unique_id, unique: true
  end
end
