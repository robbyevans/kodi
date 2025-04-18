# File: /server/app/services/firebase_service.rb

require 'net/http'
require 'uri'
require 'json'
require 'googleauth' # Add this line

class FirebaseService
  FCM_URL = 'https://fcm.googleapis.com/v1/projects/kodiapp-ef355/messages:send'

  def self.send_notification(device_token, title, body)
    uri = URI.parse(FCM_URL)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    message = {
      message: {
        token: device_token,
        notification: {
          title: title,
          body: body
        }
      }
    }

    Rails.logger.info "🔔 Firebase Message Payload: #{message.to_json}"

    request = Net::HTTP::Post.new(uri.request_uri)
    request['Authorization'] = "Bearer #{access_token}"
    request['Content-Type'] = 'application/json'
    request.body = message.to_json

    response = http.request(request)
    Rails.logger.info "Firebase Response: #{response.code} - #{response.body}"
    response
  end

  def self.access_token
    scope = 'https://www.googleapis.com/auth/firebase.messaging'
    json_key = JSON.parse(ENV['FIREBASE_SERVICE_ACCOUNT_JSON'])
    keyfile = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: StringIO.new(json_key.to_json),
      scope: scope
    )
    token = keyfile.fetch_access_token!['access_token']
    Rails.logger.info "Generated Firebase access token: #{token}"
    token
  end
end
