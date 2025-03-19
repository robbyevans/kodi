class PaymentsChannel < ApplicationCable::Channel
  def subscribed
    # Streams events only for the verified admin
    stream_for current_admin
  end

  def unsubscribed
    # Any cleanup when channel is unsubscribed
  end
end
