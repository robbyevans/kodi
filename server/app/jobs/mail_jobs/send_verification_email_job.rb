module MailJobs
  class SendVerificationEmailJob < ApplicationJob
    queue_as :default

    def perform(*args)
      # To be implemented
    end
  end
end
