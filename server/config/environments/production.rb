# /server/config/environments/production.rb

require 'active_support/core_ext/integer/time'

Rails.application.configure do
  # Code is not reloaded between requests.
  config.enable_reloading = false

  # Eager load code on boot.
  config.eager_load = true

  # Full error reports are disabled and caching is on.
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  # Static assets served by app server (keep default false unless needed)
  # config.public_file_server.enabled = false

  # Do not fall back to assets pipeline if a precompiled asset is missed.
  config.assets.compile = false

  # Use Tigris for Active Storage (see storage.yml).
  config.active_storage.service = :tigris
  config.active_storage.variant_processor = :vips

  # Host used when generating URLs (ActiveStorage, mailers, etc.)
  app_host = ENV.fetch('APP_HOST', 'https://server-misty-mountain-4350.fly.dev')
  config.active_storage.default_url_options = { host: app_host }

  # SSL / HSTS
  config.force_ssl = true
  # config.ssl_options = { redirect: { exclude: ->(req) { req.path == "/up" } } }

  # Action Cable (Fly + Cloudflare Pages)
  config.action_cable.url = 'wss://server-misty-mountain-4350.fly.dev/cable'
  config.action_cable.allowed_request_origins = [
    'https://kodi-2ti.pages.dev',
    'https://server-misty-mountain-4350.fly.dev'
  ]

  # Logging to STDOUT
  config.logger = ActiveSupport::Logger.new(STDOUT)
                                       .tap  { |l| l.formatter = ::Logger::Formatter.new }
                                       .then { |l| ActiveSupport::TaggedLogging.new(l) }
  config.log_tags  = [:request_id]
  config.log_level = ENV.fetch('RAILS_LOG_LEVEL', 'info')

  # Mailer
  config.action_mailer.perform_caching = false
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address:              ENV['SMTP_HOST'],
    port:                 ENV['SMTP_PORT'],
    user_name:            ENV['SMTP_USERNAME'],
    password:             ENV['SMTP_PASSWORD'],
    authentication:       :plain,
    enable_starttls_auto: true
  }
  config.action_mailer.default_url_options = { host: app_host }
  config.action_mailer.default_options     = { from: 'Kodi PMS <no-reply@kodi-pms.com>' }

  # I18n & deprecations
  config.i18n.fallbacks = true
  config.active_support.report_deprecations = false

  # DB schema dump
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  # Default URL options for routes (helps url_for outside mailers)
  routes.default_url_options[:host] = app_host
end
