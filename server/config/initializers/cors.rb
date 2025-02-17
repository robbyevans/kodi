Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch("FRONTEND_URL", "http://localhost:5173").split(",")
    resource '*',
             headers: :any,
             methods: [:get, :post, :patch, :put, :delete, :options],
             credentials: true
  end
end
