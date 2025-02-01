class AddAuthTokenToAdmins < ActiveRecord::Migration[7.2]
  def change
    add_column :admins, :auth_token, :string
  end
end
