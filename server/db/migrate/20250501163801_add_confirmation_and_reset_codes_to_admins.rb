class AddConfirmationAndResetCodesToAdmins < ActiveRecord::Migration[7.2]
  def change
    add_column :admins, :email_confirmation_code, :string
    add_index  :admins, :email_confirmation_code
    add_column :admins, :email_confirmation_code_sent_at,       :datetime
    add_column :admins, :email_confirmed_at,                    :datetime
    add_column :admins, :is_email_verified,                     :boolean, default: false, null: false
    add_column :admins, :reset_password_code,                   :string
    add_index  :admins, :reset_password_code
    add_column :admins, :reset_password_sent_at, :datetime
  end
end
