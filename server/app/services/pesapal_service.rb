# app/services/pesapal_service.rb
class PesapalService
  def initialize(environment = ENV['APP_ENVIRONMENT'] || 'sandbox')
    @environment = environment
    @consumer_key = ENV['PESAPAL_CONSUMER_KEY']
    @consumer_secret = ENV['PESAPAL_CONSUMER_SECRET']
    @api_url = ENV['PESAPAL_API_URL'] # URL from .env

    Rails.logger.debug("Pesapal Consumer Key: #{@consumer_key}")
    Rails.logger.debug("Pesapal API URL: #{@api_url}")
  end

  # Method to request an access token
  def request_token
    headers = {
      'Accept' => 'application/json',
      'Content-Type' => 'application/json'
    }

    # Request body containing consumer key and secret
    data = {
      consumer_key: @consumer_key,
      consumer_secret: @consumer_secret
    }

    # Make the API request
    response = RestClient.post(@api_url, data.to_json, headers)

      # Log the full response body
    Rails.logger.info "PesaPal Response: #{response.body}"

    token = JSON.parse(response.body)['token']
    Rails.logger.info "Token: #{token}"

    
    # Parse the response to extract the access token
    token
  rescue RestClient::ExceptionWithResponse => e
    Rails.logger.error "PesaPal API Error: #{e.response}"
    nil
  end
end