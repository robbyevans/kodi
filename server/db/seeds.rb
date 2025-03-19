# # db/seeds.rb

# require 'securerandom'

# # Set constants for the seed
# property_unique_id = "1028"
# short_code         = "12345"
# transaction_type   = "rent"

# # Use current date for current payments and a previous date for historical payments.
# current_date  = Time.now
# previous_date = current_date - 2.months

# payments_data = []

# # === CURRENT PAYMENTS (for current month/year) ===
# # Houses: A101, A102, A103, A104

# payments_data << {
#   transaction_id: SecureRandom.uuid,
#   bill_ref_number: "#{property_unique_id}#A101",
#   msisdn: "+254700000001",
#   transaction_amount: 2500,
#   transaction_type: transaction_type,
#   payment_date: current_date,
#   short_code: short_code,
#   status: "success",
#   property_id: property_unique_id,
#   house_number: "A101",
#   settled: true
# }

# payments_data << {
#   transaction_id: SecureRandom.uuid,
#   bill_ref_number: "#{property_unique_id}#A102",
#   msisdn: "+254700000002",
#   transaction_amount: 3500,
#   transaction_type: transaction_type,
#   payment_date: current_date,
#   short_code: short_code,
#   status: "success",
#   property_id: property_unique_id,
#   house_number: "A102",
#   settled: true
# }

# payments_data << {
#   transaction_id: SecureRandom.uuid,
#   bill_ref_number: "#{property_unique_id}#A103",
#   msisdn: "+254700000003",
#   transaction_amount: 5500,
#   transaction_type: transaction_type,
#   payment_date: current_date,
#   short_code: short_code,
#   status: "success",
#   property_id: property_unique_id,
#   house_number: "A103",
#   settled: true
# }

# payments_data << {
#   transaction_id: SecureRandom.uuid,
#   bill_ref_number: "#{property_unique_id}#A104",
#   msisdn: "+254700000004",
#   transaction_amount: 5500,
#   transaction_type: transaction_type,
#   payment_date: current_date,
#   short_code: short_code,
#   status: "success",
#   property_id: property_unique_id,
#   house_number: "A104",
#   settled: true
# }

# # === PREVIOUS PAYMENTS (historical payments) ===
# # For houses A105, B106, H107 we create previous-dated payments.

# # A105: 4 payments
# 4.times do |i|
#   payments_data << {
#     transaction_id: SecureRandom.uuid,
#     bill_ref_number: "#{property_unique_id}#A105",
#     msisdn: "+25470000000#{5 + i}",
#     transaction_amount: 5500,
#     transaction_type: transaction_type,
#     payment_date: previous_date - i.days, # Slightly different dates
#     short_code: short_code,
#     status: "success",
#     property_id: property_unique_id,
#     house_number: "A105",
#     settled: true
#   }
# end





# # Create Payment records
# payments_data.each do |attrs|
#   Payment.create!(attrs)
# end

# puts "Seeding success!!🍀"
