# Uses comma-separated origins from ENV to keep config flexible per environment.

allowed_origins = ENV.fetch("CORS_ALLOWED_ORIGINS", "").split(/\s*,\s*/).reject(&:empty?)

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*allowed_origins)
    resource "*",
      headers: :any,
      methods: %i[get post put patch delete options head],
      credentials: true
  end
end
