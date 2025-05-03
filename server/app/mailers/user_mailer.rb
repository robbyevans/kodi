# app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
  # no code in welcome—just a greeting
  def welcome_email(admin)
    @admin = admin
    mail(to: @admin.email, subject: 'Welcome to Kodi PMS!')
  end

  # sends the 6-char confirmation code
  def confirmation_code_email(admin)
    @admin = admin
    mail(to: admin.email,
         subject: 'Your Kodi PMS email confirmation code')
  end

  # sends the 6-char reset code
  def reset_password_code_email(admin)
    @admin = admin
    mail(to: @admin.email,
         subject: 'Your Kodi PMS password reset code')
  end

  # unchanged: tenant receipt with PDF stub
  def payment_receipt_email(tenant, payment)
    @tenant  = tenant
    @payment = payment
    attachments["receipt_#{payment.transaction_id}.pdf"] = {
      mime_type: 'application/pdf',
      content: "PDF stub for #{payment.transaction_id}"
    }
    mail(to: @tenant.email,
         subject: "Kodi PMS: Payment receipt for #{payment.house_number}")
  end

  # 4) Start-of-month summary (PDF stub)
  def monthly_start_email(admin)
    @admin = admin
    attachments["statement_#{Date.current.beginning_of_month}.pdf"] = {
      mime_type: 'application/pdf',
      content: 'Monthly statement PDF content (to be implemented)'
    }
    mail(
      to: @admin.email,
      subject: 'Kodi PMS: Your monthly statement is ready'
    )
  end

  # 5) End-of-month summary (PDF stub)
  def monthly_end_email(admin)
    @admin = admin
    attachments["summary_#{Date.current.end_of_month}.pdf"] = {
      mime_type: 'application/pdf',
      content: 'End-of-month summary PDF content (to be implemented)'
    }
    mail(
      to: @admin.email,
      subject: 'Kodi PMS: End-of-month summary'
    )
  end

  # Send notifications/messages to all tenants
  def tenant_notification_email(tenant, subject, body)
    mail(
      to: tenant.email,
      subject: subject,
      body: body, # ← inline text body
      content_type: 'text/plain'
    )
  end

  #  Assistant-admin receives a temporary password
  def assistant_welcome_email(assistant, raw_password)
    @assistant = assistant
    @raw_password = raw_password
    mail(to: assistant.email,
         subject: 'You’ve been added as an Assistant in Kodi PMS')
  end
end
