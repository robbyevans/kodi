json.extract! house, :id, :house_number, :payable_rent, :tenant_id, :property_id, :created_at, :updated_at
json.url house_url(house, format: :json)
