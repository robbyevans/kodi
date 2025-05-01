# app/jobs/mail_jobs/monthly_start_job.rb
module MailJobs
  class MonthlyStartJob < ApplicationJob
    queue_as :default
    def perform
      Admin.find_each(&:monthly_start_email)
    end
  end
end

# app/jobs/mail_jobs/daily_end_of_month_check_job.rb
module MailJobs
  class DailyEndOfMonthCheckJob < ApplicationJob
    queue_as :default
    def perform
      return unless Date.current.end_of_month?

      Admin.find_each(&:monthly_end_email)
    end
  end
end
