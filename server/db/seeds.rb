# db/seeds.rb

# Create Admin
# Create Admin
admin = Admin.create!(
  email: 'johndoe@gmail.com',
  password: '@johndoe001'  # Use password instead of password_digest
)


# Create Properties for the Admin
property_1 = admin.properties.create!(name: 'Annex Estate')
property_2 = admin.properties.create!(name: 'Kapsoya Estate')

# Seed Houses for Property 1 (Annex Estate)
10.times do |i|
  house = property_1.houses.create!(
    house_number: "House #{i + 1}",
    payable_rent: rand(5500..15000)
  )

  # Assign tenant to 7 houses, randomly
  if i < 7
    tenant = Tenant.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      phone_number: Faker::PhoneNumber.phone_number
    )
    house.update!(tenant: tenant)
  end
end

# Seed Houses for Property 2 (Kapsoya Estate)
10.times do |i|
  house = property_2.houses.create!(
    house_number: "House #{i + 1}",
    payable_rent: rand(5500..15000)
  )

  # Assign tenant to 7 houses, randomly
  if i < 7
    tenant = Tenant.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      phone_number: Faker::PhoneNumber.phone_number
    )
    house.update!(tenant: tenant)
  end
end

puts "Seeding completed successfully🍀 🎉 !"
