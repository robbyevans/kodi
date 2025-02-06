class AddPropertyImageToProperties < ActiveRecord::Migration[7.2]
  def change
    add_column :properties, :property_image, :string
  end
end
