class RemoveMpesaPaybillNumberFromProperties < ActiveRecord::Migration[7.2]
  def change
    remove_column :properties, :mpesa_paybill_number, :string
  end
end

