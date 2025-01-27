class ChangeTenantIdInHousesToOptional < ActiveRecord::Migration[7.2]
  def change
    change_column_null :houses, :tenant_id, true
  end
end
