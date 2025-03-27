class AddNotificationAndAgreementFlagsToAdmins < ActiveRecord::Migration[7.0]
  def change
    add_column :admins, :is_notifications_allowed, :boolean, default: false
    add_column :admins, :is_terms_and_conditions_agreed, :boolean, default: false
  end
end
