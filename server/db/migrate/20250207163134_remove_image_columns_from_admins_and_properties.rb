class RemoveImageColumnsFromAdminsAndProperties < ActiveRecord::Migration[7.2]
  def change
    remove_column :admins, :profile_image, :string
    remove_column :properties, :property_image, :string
  end
end
