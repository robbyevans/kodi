require 'sidekiq'
require 'sidekiq-scheduler'

Sidekiq.configure_server do |config|
  config.redis = { url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0') }

  schedule_file = "config/schedule_#{Rails.env}.yml"
  if File.exist?(schedule_file)
    config.on(:startup) do
      Sidekiq.schedule = YAML.load_file(schedule_file)
      Sidekiq::Scheduler.reload_schedule!
    end
  end
end


Sidekiq.configure_client do |config|
  config.redis = { url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0') }
end
