class CreateTenantHouseAgreements < ActiveRecord::Migration[7.0]
  def change
    create_table :tenant_house_agreements do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :house, null: false, foreign_key: true

      # Manually add precision/scale:
      t.decimal :deposit, precision: 10, scale: 2, default: 0.0
      t.decimal :monthly_rent, precision: 10, scale: 2, default: 0.0
      t.decimal :balance, precision: 10, scale: 2, default: 0.0

      t.datetime :start_date
      t.datetime :end_date
      t.string :status, default: "active"

      t.timestamps
    end
  end
end
