class RenamePropertyIdToPropertyUidInLedgerEntries < ActiveRecord::Migration[6.0]
  def change
    rename_column :ledger_entries, :property_id, :property_uid
  end
end
