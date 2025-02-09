class AddPayableDepositToHouses < ActiveRecord::Migration[7.2]
  def change
    add_column :houses, :payable_deposit, :decimal, precision: 10, scale: 2, null: true
  end
end
