json.extract! tenant, :id, :name, :phone_number, :email, :created_at, :updated_at
json.url tenant_url(tenant, format: :json)
