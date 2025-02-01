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

ActiveRecord::Schema[7.2].define(version: 2025_02_01_084611) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "admin", null: false
    t.string "auth_token"
  end

  create_table "houses", force: :cascade do |t|
    t.string "house_number"
    t.decimal "payable_rent"
    t.bigint "tenant_id"
    t.bigint "property_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id"], name: "index_houses_on_property_id"
    t.index ["tenant_id"], name: "index_houses_on_tenant_id"
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
    t.index ["bill_ref_number", "msisdn"], name: "index_payments_on_bill_ref_number_and_msisdn"
    t.index ["transaction_id"], name: "index_payments_on_transaction_id", unique: true
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "admin_id"
    t.index ["admin_id"], name: "index_properties_on_admin_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
    t.string "phone_number"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "houses", "properties"
  add_foreign_key "houses", "tenants"
  add_foreign_key "properties", "admins"
end
