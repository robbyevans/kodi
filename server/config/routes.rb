# config/routes.rb
require 'sidekiq/web'

Rails.application.routes.draw do
  # Health checks
  if defined?(Rails::HealthController) # Rails 7.1+
    get '/up', to: 'rails/health#show', as: :rails_health_check
  else
    get '/up', to: proc { [200, { 'Content-Type' => 'text/plain' }, ['OK']] }
  end
  get '/healthz', to: proc { [200, { 'Content-Type' => 'text/plain' }, ['OK']] }

  # Secure Sidekiq Web UI (requires secrets SIDEKIQ_USERNAME, SIDEKIQ_PASSWORD)
  Sidekiq::Web.use Rack::Session::Cookie, secret: Rails.application.secret_key_base
  Sidekiq::Web.use Rack::Auth::Basic do |u, p|
    ActiveSupport::SecurityUtils.secure_compare(u, ENV.fetch('SIDEKIQ_USERNAME')) &&
      ActiveSupport::SecurityUtils.secure_compare(p, ENV.fetch('SIDEKIQ_PASSWORD'))
  end
  mount Sidekiq::Web => '/sidekiq'

  # Convenience endpoints
  get '/tenants', to: 'tenants#all'
  get '/houses',  to: 'houses#all'

  # Nested resources
  resources :properties, except: %i[new edit] do
    resources :houses, except: %i[new edit]
  end
  resources :houses, only: [] do
    resources :tenants, except: %i[new edit]
  end

  resources :ledger_entries, only: [:index] do
    collection { get :download_statement }
  end
  resources :wallets, only: [] do
    collection { get :current }
  end
  resources :withdrawals, only: [:create]

  # Admin/auth
  resources :admins, only: %i[index create update destroy] do
    collection do
      get  :current
      post :send_confirmation_code
      post :confirm_email
    end
  end
  post '/signup',      to: 'admins#create' # optional alias
  post '/login',       to: 'admins#login'
  post '/auth/google', to: 'admins#google_auth'

  resources :assistant_admins, only: %i[index create update destroy]
  resources :password_resets, only: [:create] do
    collection do
      post :verify
      post :reset
    end
  end

  resources :tenant_notification_histories, only: %i[index show]

  # Payments
  resources :payments, only: [:index]
  post 'payments/ipn', to: 'payments#ipn'

  # Batch notifications
  post '/tenant_notifications', to: 'tenant_notifications#create'

  # Root (likely auth-guarded)
  root 'properties#index'
end
