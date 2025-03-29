class AddPropertyIdToPayments < ActiveRecord::Migration[7.0]
  def change
    add_column :payments, :property_id, :string
    add_index :payments, :property_id
  end
end
