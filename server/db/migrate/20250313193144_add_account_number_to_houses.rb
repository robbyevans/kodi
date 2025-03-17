class AddAccountNumberToHouses < ActiveRecord::Migration[7.2]
  def change
    add_column :houses, :account_number, :string
    add_index :houses, :account_number, unique: true
  end
end

