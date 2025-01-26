class CreateHouses < ActiveRecord::Migration[7.2]
  def change
    create_table :houses do |t|
      t.string :house_number
      t.decimal :payable_rent
      t.references :tenant, null: false, foreign_key: true
      t.references :property, null: false, foreign_key: true

      t.timestamps
    end
  end
end
