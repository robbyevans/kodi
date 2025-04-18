require 'sidekiq'
require 'sidekiq-scheduler'
require 'yaml'
require 'erb'

Sidekiq.configure_server do |config|
  config.redis = { url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0') }

  schedule_file = "config/schedule_#{Rails.env}.yml"

  if File.exist?(schedule_file)
    config.on(:startup) do
      raw_yaml = ERB.new(File.read(schedule_file)).result
      schedule = Psych.safe_load(raw_yaml, aliases: true)

      Sidekiq::Scheduler.dynamic = true
      Sidekiq.schedule = schedule
      Sidekiq::Scheduler.reload_schedule!
    end
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0') }
end
