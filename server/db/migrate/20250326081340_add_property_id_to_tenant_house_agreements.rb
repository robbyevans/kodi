class AddPropertyIdToTenantHouseAgreements < ActiveRecord::Migration[7.0]
  def change
    add_reference :tenant_house_agreements, :property, null: false, foreign_key: true
  end
end
