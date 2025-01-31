Rails.application.routes.draw do
  # Standard CRUD routes
  resources :properties # Full CRUD for properties.
  resources :houses # Full CRUD for houses.
  resources :tenants # Full CRUD for tenants.
  resources :admins, only: [:index, :show, :new, :create, :update, :destroy] # Limited CRUD for admins (only new, create, and destroy).

  # Login routes
  post "/signup", to: "admins#create" # Signup for new admins.
  get 'login', to: 'sessions#new' # Render login page.
  post 'login', to: 'sessions#create' # Handle login.
  delete '/logout', to: 'sessions#destroy' # Handle logout.
  get '/current_user', to: 'sessions#current_admin' # Fetch current logged-in admin.

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
# POST	/signup	----admins#create Signup for new admins.
# GET	/login	----sessions#new	Render login page.
# POST	/login	----sessions#create	Handle login.
# DELETE	/logout	----sessions#destroy	Handle logout.
# GET	/current_user	----sessions#current_admin	Fetch current logged-in admin.
# POST	/payments/authenticate	-----payments#authenticate	Authenticate with PesaPal.
# POST	/payments/create_payment	----payments#create_payment	Create a payment request.
# GET	/payments/payment_status	------payments#payment_status	Check payment status.
# GET	/	properties#index	Default route (properties index).
