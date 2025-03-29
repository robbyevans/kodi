Rails.application.routes.draw do

  
  # Custom routes for fetching all tenants and houses for the current admin
  get '/tenants', to: 'tenants#all'
  get '/houses', to: 'houses#all'

  # Nest houses under properties so URLs look like /properties/:property_id/houses
  resources :properties, except: [:new, :edit] do
    resources :houses, except: [:new, :edit]
  end

  # Nest tenants under houses so URLs look like /houses/:house_id/tenants
  resources :houses, only: [] do
    resources :tenants, except: [:new, :edit]
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
  resources :admins, only: [:index, :create, :update, :destroy]
 

  
  post "/signup", to: "admins#create"
  post "/login", to: "admins#login"
    post "/auth/google", to: "admins#google_auth"

  # Payment routes 
  resources :payments, only: [:index]
  post 'payments/ipn', to: 'payments#ipn'  # IPN listener route

  # Root path – returns all properties for the current admin
  root 'properties#index'
end
