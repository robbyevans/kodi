class AddPropertyIdHouseNumberAndSettledToPayments < ActiveRecord::Migration[7.2]
  def change
    add_column :payments, :property_id, :string
    add_column :payments, :house_number, :string
    add_column :payments, :settled, :boolean, default: false

    # If there's an existing 'timestamp' column that should be renamed to 'payment_date':
    rename_column :payments, :timestamp, :payment_date if column_exists?(:payments, :timestamp)
  end
end
