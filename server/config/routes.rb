Rails.application.routes.draw do
  # Nest houses under properties so URLs look like /properties/:property_id/houses
  resources :properties, except: [:new, :edit] do
    resources :houses, except: [:new, :edit]
  end

  # Nest tenants under houses so URLs look like /houses/:house_id/tenants
  resources :houses, only: [] do
    resources :tenants, except: [:new, :edit]
  end

  resources :admins, only: [:index, :create, :update, :destroy]

  # Admin routes for signup and login
  post "/signup", to: "admins#create"
  post "/login", to: "admins#login"

  # Payment routes remain unchanged
  post 'payments/authenticate', to: 'payments#authenticate'
  post 'payments/create_payment', to: 'payments#create_payment'
  get 'payments/payment_status', to: 'payments#payment_status'

  root 'properties#index'
end
