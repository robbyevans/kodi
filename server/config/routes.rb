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

  root 'properties#index'
end
