# config/routes.rb
require 'sidekiq/web'

Rails.application.routes.draw do
  # --- Health check (use this in fly.toml checks) ---
  get '/healthz', to: proc { [200, {}, ['OK']] }

  # --- Secure Sidekiq Web UI ---
  # Sidekiq Web needs a session in API-only apps, and must be protected.
  Sidekiq::Web.use Rack::Session::Cookie, secret: Rails.application.secret_key_base
  Sidekiq::Web.use Rack::Auth::Basic do |u, p|
    ActiveSupport::SecurityUtils.secure_compare(u, ENV.fetch('SIDEKIQ_USERNAME')) &&
      ActiveSupport::SecurityUtils.secure_compare(p, ENV.fetch('SIDEKIQ_PASSWORD'))
  end
  mount Sidekiq::Web => '/sidekiq'

  # --- Custom convenience endpoints ---
  get '/tenants', to: 'tenants#all'
  get '/houses',  to: 'houses#all'

  # --- Nested resources ---
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

  # --- Admin/auth routes (deduped) ---
  resources :admins, only: %i[index create update destroy] do
    collection do
      get  :current
      post :send_confirmation_code
      post :confirm_email
    end
  end
  post '/signup',       to: 'admins#create' # optional alias of admins#create
  post '/login',        to: 'admins#login'
  post '/auth/google',  to: 'admins#google_auth'

  resources :assistant_admins, only: %i[index create update destroy]
  resources :password_resets, only: [:create] do
    collection do
      post :verify
      post :reset
    end
  end

  resources :tenant_notification_histories, only: %i[index show]

  post '/signup', to: 'admins#create'
  post '/login', to: 'admins#login'
  post '/auth/google', to: 'admins#google_auth'

  # Payment routes
  resources :payments, only: [:index]
  post 'payments/ipn', to: 'payments#ipn' # IPN listener route

  # single, batch‐send endpoint:
  post '/tenant_notifications', to: 'tenant_notifications#create'

  # Root (likely requires auth; expect “Token is missing” if you hit it raw)
  root 'properties#index'
end
