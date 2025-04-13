# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_04_13_054350) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "admin", null: false
    t.string "auth_token"
    t.string "name"
    t.string "phone_number"
    t.boolean "is_notifications_allowed", default: false
    t.boolean "is_terms_and_conditions_agreed", default: false
    t.string "device_token"
  end

  create_table "houses", force: :cascade do |t|
    t.string "house_number"
    t.decimal "payable_rent"
    t.bigint "tenant_id"
    t.bigint "property_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "payable_deposit", precision: 10, scale: 2
    t.string "account_number"
    t.index ["account_number"], name: "index_houses_on_account_number", unique: true
    t.index ["property_id"], name: "index_houses_on_property_id"
    t.index ["tenant_id"], name: "index_houses_on_tenant_id"
  end

  create_table "ledger_entries", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.bigint "wallet_id", null: false
    t.string "transaction_type", null: false
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.decimal "balance_after", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "transaction_id"
    t.string "property_uid"
    t.string "house_number"
    t.index ["admin_id"], name: "index_ledger_entries_on_admin_id"
    t.index ["wallet_id"], name: "index_ledger_entries_on_wallet_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "transaction_id", null: false
    t.string "bill_ref_number", null: false
    t.string "msisdn", null: false
    t.decimal "transaction_amount", precision: 10, scale: 2, null: false
    t.string "transaction_type", null: false
    t.datetime "payment_date", null: false
    t.string "short_code", null: false
    t.string "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "property_uid"
    t.string "house_number"
    t.boolean "settled", default: false
    t.string "property_id"
    t.index ["bill_ref_number", "msisdn"], name: "index_payments_on_bill_ref_number_and_msisdn"
    t.index ["property_id"], name: "index_payments_on_property_id"
    t.index ["transaction_id"], name: "index_payments_on_transaction_id", unique: true
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "admin_id"
    t.string "location"
    t.string "address"
    t.string "property_uid"
    t.index ["admin_id"], name: "index_properties_on_admin_id"
    t.index ["property_uid"], name: "index_properties_on_property_uid", unique: true
  end

  create_table "tenant_house_agreements", force: :cascade do |t|
    t.bigint "tenant_id", null: false
    t.bigint "house_id", null: false
    t.decimal "deposit", precision: 10, scale: 2, default: "0.0"
    t.decimal "monthly_rent", precision: 10, scale: 2, default: "0.0"
    t.decimal "balance", precision: 10, scale: 2, default: "0.0"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string "status", default: "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "property_id", null: false
    t.index ["house_id"], name: "index_tenant_house_agreements_on_house_id"
    t.index ["property_id"], name: "index_tenant_house_agreements_on_property_id"
    t.index ["tenant_id"], name: "index_tenant_house_agreements_on_tenant_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
    t.string "phone_number"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "national_id", default: "unknown", null: false
  end

  create_table "wallets", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.decimal "balance", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_wallets_on_admin_id"
  end

  create_table "withdrawals", force: :cascade do |t|
    t.bigint "admin_id", null: false
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.string "status", default: "pending", null: false
    t.text "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_withdrawals_on_admin_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "houses", "properties"
  add_foreign_key "houses", "tenants"
  add_foreign_key "ledger_entries", "admins"
  add_foreign_key "ledger_entries", "wallets"
  add_foreign_key "properties", "admins"
  add_foreign_key "tenant_house_agreements", "houses"
  add_foreign_key "tenant_house_agreements", "properties"
  add_foreign_key "tenant_house_agreements", "tenants"
  add_foreign_key "wallets", "admins"
  add_foreign_key "withdrawals", "admins"
end
