class CreateWithdrawals < ActiveRecord::Migration[7.2]
  def change
    create_table :withdrawals do |t|
      t.references :admin, null: false, foreign_key: true
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.string :status, null: false, default: "pending" # statuses: pending, completed, failed
      t.text :details

      t.timestamps
    end
  end
end
