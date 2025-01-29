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

  # Mpesa routes
  post '/api/mpesa/register_urls', to: 'mpesa#register_urls'
  post '/api/mpesa/validation', to: 'mpesa#validation'
  post '/api/mpesa/confirmation', to: 'mpesa#confirmation'

  root 'properties#index'
end
