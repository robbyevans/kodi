# to be implemented later
module MailJobs
  class SendMonthlyStatementJob < ApplicationJob
    queue_as :default

    def perform(*args)
      # your logic here
    end
  end
end
