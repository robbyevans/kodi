class AddMpesaPaybillNumberLocationAndAddressToProperties < ActiveRecord::Migration[7.2]
  def change
    add_column :properties, :mpesa_paybill_number, :string
    add_column :properties, :location, :string
    add_column :properties, :address, :string
  end
end
