module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_admin

    def connect
      self.current_admin = find_verified_admin
    end

    protected

    def find_verified_admin
      token = request.params[:token]
      if token
        payload = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')[0]
        if (admin = Admin.find_by(id: payload["admin_id"]))
          return admin
        end
      end
      reject_unauthorized_connection
    rescue JWT::DecodeError => e
      reject_unauthorized_connection
    end
  end
end
