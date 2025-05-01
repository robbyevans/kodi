# app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: 'Kodi PMS <no-reply@kodi-pms.com>'
  layout 'mailer'
end
