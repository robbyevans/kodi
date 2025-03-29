class AddDeviceTokenToAdmins < ActiveRecord::Migration[7.2]
  def change
    add_column :admins, :device_token, :string
  end
end
