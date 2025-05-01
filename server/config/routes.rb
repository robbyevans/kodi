require 'sidekiq/web'

Rails.application.routes.draw do
  # Mount Sidekiq Web UI at /sidekiq without authentication
  mount Sidekiq::Web => '/sidekiq'

  # Custom routes for fetching all tenants and houses for the current admin
  get '/tenants', to: 'tenants#all'
  get '/houses', to: 'houses#all'

  # Nest houses under properties so URLs look like /properties/:property_id/houses
  resources :properties, except: %i[new edit] do
    resources :houses, except: %i[new edit]
  end

  # Nest tenants under houses so URLs look like /houses/:house_id/tenants
  resources :houses, only: [] do
    resources :tenants, except: %i[new edit]
  end

  # Ledger entries API endpoints
  resources :ledger_entries, only: [:index] do
    collection do
      get 'download_statement'
    end
  end

  resources :wallets, only: [] do
    collection do
      get 'current'
    end
  end

  # Withdrawal route
  resources :withdrawals, only: [:create]

  # Admin-related routes (for management and authentication)
  resources :admins, only: %i[index create update destroy]

  # reset passwordand email confirmation link
  resources :admins, only: %i[index create update destroy] do
    collection do
      post :send_confirmation_code   # auth required
      post :confirm_email            # auth required
    end
  end

  resources :password_resets, only: [:create] do
    collection do
      post :verify    # check code validity
      post :reset     # submit code + new password
    end
  end

  post '/signup', to: 'admins#create'
  post '/login', to: 'admins#login'
  post '/auth/google', to: 'admins#google_auth'

  # Payment routes
  resources :payments, only: [:index]
  post 'payments/ipn', to: 'payments#ipn' # IPN listener route

  # sending notifications / messages to tenants emails
  post 'notifications/tenant/:tenant_id', to: 'notifications#tenant'
  post 'notifications/tenants', to: 'notifications#all_tenants'

  # Root path – returns all properties for the current admin
  root 'properties#index'
end
