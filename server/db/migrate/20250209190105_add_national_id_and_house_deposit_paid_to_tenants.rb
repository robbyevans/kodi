class AddNationalIdAndHouseDepositPaidToTenants < ActiveRecord::Migration[7.2]
  def change
    add_column :tenants, :national_id, :string, null: false, default: 'unknown'
    add_column :tenants, :house_deposit_paid, :decimal, precision: 10, scale: 2, null: true
  end
end
