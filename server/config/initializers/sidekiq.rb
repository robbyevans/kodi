require "sidekiq"
require "sidekiq-scheduler"
require "yaml"
require "erb"

def sidekiq_redis_url
  ENV["SIDEKIQ_REDIS_URL"].presence ||
    ENV["REDIS_URL"].presence ||
    ENV["REDIS_TLS_URL"].presence || # some stacks use this
    "redis://localhost:6379/0"
end

Sidekiq.configure_server do |config|
  config.redis = { url: sidekiq_redis_url }

  schedule_file = Rails.root.join("config", "schedule", "#{Rails.env}.yml")
  if File.exist?(schedule_file)
    config.on(:startup) do
      raw_yaml = ERB.new(File.read(schedule_file)).result
      schedule  = Psych.safe_load(raw_yaml, aliases: true) || {}
      Sidekiq::Scheduler.dynamic = true
      Sidekiq.schedule = schedule
      Sidekiq::Scheduler.reload_schedule!
    rescue StandardError => e
      Sidekiq.logger.error("[Sidekiq::Scheduler] Failed to load #{schedule_file}: #{e.class} #{e.message}")
    end
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: sidekiq_redis_url }
end
