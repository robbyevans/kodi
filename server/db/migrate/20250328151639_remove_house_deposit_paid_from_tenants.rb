class RemoveHouseDepositPaidFromTenants < ActiveRecord::Migration[7.2]
  def change
    remove_column :tenants, :house_deposit_paid, :decimal
  end
end