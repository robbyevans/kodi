class AddAdminToProperties < ActiveRecord::Migration[7.2]
  def change
    add_reference :properties, :admin, null: true, foreign_key: true
  end
end
