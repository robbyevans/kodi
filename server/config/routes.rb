Rails.application.routes.draw do
  resources :properties
  resources :houses
  resources :tenants
  resources :admins, only: [:new, :create, :destroy]
  
  # Login routes
  post "/signup", to: "admins#create"
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

    # PesaPal routes
    post 'payments/authenticate', to: 'payments#authenticate'
    post 'payments/create_payment', to: 'payments#create_payment'
    get 'payments/payment_status', to: 'payments#payment_status'

  root 'properties#index'
end
