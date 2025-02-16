require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

if Rails.env.development? || Rails.env.test?
  require 'dotenv/rails'
end


module Server
  class Application < Rails::Application
    config.load_defaults 7.2

    # Disable CSRF protection for API
    config.api_only = true
    config.action_controller.allow_forgery_protection = false

    # CORS Configuration for Frontend
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:5173'  # Change this to your production domain when needed
        resource '*', 
          headers: :any, 
          methods: %i[get post patch put delete options head], 
          credentials: true
      end
    end

  end
end

