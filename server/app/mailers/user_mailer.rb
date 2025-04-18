class UserMailer < ApplicationMailer
  default from: "noreply@kodi.com"

  def verification_email(admin)
    @admin = admin
    mail(to: @admin.email, subject: "Please verify your email for Kodi")
  end

  def password_reset(admin, token)
    @admin = admin
    @reset_token = token
    mail(to: @admin.email, subject: "Reset your Kodi password")
  end

  def monthly_statement(admin, pdf)
    attachments["monthly_statement.pdf"] = pdf
    mail(to: @admin.email, subject: "Your Monthly Rent Statement")
  end
end
