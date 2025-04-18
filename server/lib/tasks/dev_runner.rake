namespace :run do
  desc 'Run Redis, Sidekiq, and Rails server using Foreman'
  task :dev do
    puts '🚀 Starting dev environment: Rails + Sidekiq + Redis'
    exec('bundle exec foreman start -f Procfile.dev')
  end
end
