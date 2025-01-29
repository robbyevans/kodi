class CreateMpesaPayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.string :transaction_id, null: false, unique: true
      t.string :bill_ref_number, null: false
      t.string :msisdn, null: false
      t.decimal :transaction_amount, null: false, precision: 10, scale: 2
      t.string :transaction_type, null: false
      t.datetime :payment_date, null: false
      t.string :short_code, null: false
      t.string :status, null: false
      t.timestamps
    end

    # Check if index exists before adding
    unless index_exists?(:payments, :transaction_id)
      add_index :payments, :transaction_id, unique: true
    end

    # Add composite index if it doesn't exist
    unless index_exists?(:payments, [:bill_ref_number, :msisdn])
      add_index :payments, [:bill_ref_number, :msisdn]
    end
  end
end



# Explanation of the Migration Code:
# Columns:

# transaction_id: Unique identifier for the transaction, indexed to ensure uniqueness and optimize lookups.
# bill_ref_number: Unique reference to identify the house (linked to house_number in the houses table).
# msisdn: Tenant's phone number, used for cross-verification.
# transaction_amount: The amount paid in the transaction.
# transaction_type: Type of transaction (e.g., Paybill, Till Number, etc.).
# payment_date: Timestamp for when the payment occurred.
# short_code: The paybill or till number used.
# status: Indicates the status of the payment (e.g., success, failed, pending).
# Indexes:

# transaction_id is indexed and unique to prevent duplicate transactions.
# bill_ref_number and msisdn have a composite index to optimize lookups based on these columns.
# Timestamps:

# Standard Rails created_at and updated_at columns are added automatically by t.timestamps.
