# /server/config/environments/production.rb

require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Boot & caching
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  # Assets
  config.assets.compile = false
  # config.public_file_server.enabled = false

  # Active Storage (you mentioned Tigris earlier)
  config.active_storage.service = :tigris
  config.active_storage.variant_processor = :vips

  # Public host for URL generation
  app_host = ENV.fetch("APP_HOST", "https://server-misty-mountain-4350.fly.dev")
  config.active_storage.default_url_options = { host: app_host }

  # SSL / HSTS
  config.force_ssl = true
  # config.ssl_options = { redirect: { exclude: ->(req) { req.path == "/up" } } }

  # Action Cable
  config.action_cable.url = "wss://server-misty-mountain-4350.fly.dev/cable"
  config.action_cable.allowed_request_origins = [
    "https://kodipms.com",
    "https://www.kodipms.com",
    "https://kodi-2ti.pages.dev",
    "https://server-misty-mountain-4350.fly.dev"
  ]

  # Logging
  logger = ActiveSupport::Logger.new(STDOUT)
  logger.formatter = ::Logger::Formatter.new
  config.logger = ActiveSupport::TaggedLogging.new(logger)
  config.log_tags  = [:request_id]
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")

  # Mailer
  config.action_mailer.perform_caching = false
   config.action_mailer.perform_deliveries = false
  config.action_mailer.delivery_method = :test
  config.action_mailer.smtp_settings = {
    address:              ENV["SMTP_HOST"],
    port:                 ENV.fetch("SMTP_PORT", 587),
    user_name:            ENV["SMTP_USERNAME"],
    password:             ENV["SMTP_PASSWORD"],
    authentication:       :plain,
    enable_starttls_auto: true
  }
  config.action_mailer.default_url_options = { host: app_host }
  config.action_mailer.default_options     = { from: "Kodi PMS <no-reply@kodipms.com>" }
  
  # I18n & deprecations
  config.i18n.fallbacks = true
  config.active_support.report_deprecations = false

  # Schema dumps
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  # Default URL options for routes
  routes.default_url_options[:host] = app_host

  # ---- Security: CSRF + Host Authorization ----
  # Only needed if you use cookies/sessions or Rails form_authenticity_token.
  config.action_controller.forgery_protection_origin_check = true
  #   config.action_controller.permitted_csrf_origins = [
  #   "https://kodipms.com",
  #   "https://www.kodipms.com",
  #   "https://kodi-2ti.pages.dev"
  # ]

  # Prevent Host header spoofing; allow your public domains
  config.hosts += [
    "kodipms.com",
    "www.kodipms.com"
  ]
end
