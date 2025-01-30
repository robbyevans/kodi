require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

require 'dotenv/rails'  # ✅ This is enough! No need to call Dotenv::Railtie.load

module Server
  class Application < Rails::Application
    config.load_defaults 7.2

    config.autoload_lib(ignore: %w[assets tasks])

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'  # Change this to a specific domain in production
        resource '*', headers: :any, methods: %i[get post patch put delete options head]
      end
    end
  end
end
