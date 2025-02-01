Rails.application.routes.draw do
  # Standard CRUD routes
  resources :properties, except: [:new, :edit]
  resources :houses, except: [:new, :edit]
  resources :tenants, except: [:new, :edit]
  resources :admins, only: [:index, :create, :update, :destroy]

  # Admin routes
  post "/signup", to: "admins#create" # Signup for new admins.
  post '/login', to: 'admins#login' # Login route for admin authentication.

  # PesaPal Payment Routes:
  post 'payments/authenticate', to: 'payments#authenticate' # Authenticate with PesaPal.
  post 'payments/create_payment', to: 'payments#create_payment' # Create a payment request.
  get 'payments/payment_status', to: 'payments#payment_status' # Check payment status.

  # Root route
  root 'properties#index'
end




# HTTP Method	Path	Controller#Action	Purpose
# GET	/admins	---admins#index	Fetch all admins (system admin only).
# GET	/admins/:id	----admins#show	Fetch a specific admin (system admin only).
# POST	/admins	---admins#create	Create a new admin (system admin only).
# PATCH/PUT	/admins/:id	----admins#update	Update an admin (system admin only).
# DELETE	/admins/:id	----admins#destroy	Delete an admin (system admin or self).

# POST	/payments/authenticate	-----payments#authenticate	Authenticate with PesaPal.
# POST	/payments/create_payment	----payments#create_payment	Create a payment request.
# GET	/payments/payment_status	------payments#payment_status	Check payment status.
# GET	/	properties#index	Default route (properties index).
