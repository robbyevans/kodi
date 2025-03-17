class CreateLedgerEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :ledger_entries do |t|
      t.references :admin, null: false, foreign_key: true
      t.references :wallet, null: false, foreign_key: true
      t.string :transaction_type, null: false  # "deposit" or "withdrawal"
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.decimal :balance_after, precision: 10, scale: 2, null: false
      t.text :description

      t.timestamps
    end
  end
end
