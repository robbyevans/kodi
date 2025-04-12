class UpdateLedgerEntriesRemoveDescriptionAddTransactionDetails < ActiveRecord::Migration[7.0]
  def change
    # Remove the description column
    remove_column :ledger_entries, :description, :text

    # Add new columns: transaction_id, property_id, and house_number
    add_column :ledger_entries, :transaction_id, :string
    add_column :ledger_entries, :property_id, :string
    add_column :ledger_entries, :house_number, :string
  end
end
