class AddPropertyToHouses < ActiveRecord::Migration[7.2]
  def change
    unless column_exists?(:houses, :property_id)
      add_reference :houses, :property, null: false, foreign_key: true
    end
  end
end
