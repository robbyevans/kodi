require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

require 'dotenv/rails' if Rails.env.development? || Rails.env.test?

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

require 'dotenv/rails' if Rails.env.development? || Rails.env.test?

module Server
  class Application < Rails::Application
    config.load_defaults 7.2

    # 📦 Enable autoloader logging in development
    Rails.autoloaders.each do |autoloader|
      autoloader.log! if Rails.env.development?
    end

    # Disable CSRF protection for API
    config.api_only = true

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore,
                          key: '_server_session', same_site: :lax, secure: true

    config.action_controller.allow_forgery_protection = false

    config.active_job.queue_adapter = :sidekiq

    allowed_origins = [
      ENV['FRONTEND_URL']&.split(',')
    ].compact

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins(*allowed_origins)
        resource '*',
                 headers: %w[Authorization Content-Type],
                 methods: %i[get post put patch delete options head],
                 credentials: true
      end
    end
  end
end
