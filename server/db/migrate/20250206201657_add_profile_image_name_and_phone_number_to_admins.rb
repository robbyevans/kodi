class AddProfileImageNameAndPhoneNumberToAdmins < ActiveRecord::Migration[7.2]
  def change
    add_column :admins, :profile_image, :string
    add_column :admins, :name, :string
    add_column :admins, :phone_number, :string
  end
end
