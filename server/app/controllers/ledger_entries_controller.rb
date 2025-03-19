class LedgerEntriesController < ApplicationController
  before_action :authenticate_admin

  def index
    # Assuming current_admin is available from your authentication method
    ledger_entries = current_admin.wallet.ledger_entries.order(created_at: :desc)
    render json: ledger_entries
  end

  def download_statement
    ledger_entries = current_admin.wallet.ledger_entries.order(created_at: :desc)
    pdf = Prawn::Document.new
    pdf.text "Account Statement for #{current_admin.name}", size: 20, style: :bold
    pdf.move_down 20

    table_data = [["Date", "Type", "Amount", "Balance After", "Description"]]
    ledger_entries.each do |entry|
      table_data << [
        entry.created_at.strftime("%Y-%m-%d %H:%M"),
        entry.transaction_type.capitalize,
        sprintf('%.2f', entry.amount),
        sprintf('%.2f', entry.balance_after),
        entry.description || ""
      ]
    end

    pdf.table(table_data, header: true, row_colors: ["F0F0F0", "FFFFFF"])
    send_data pdf.render, filename: "account_statement.pdf", type: "application/pdf", disposition: "attachment"
  end

  private

  def authenticate_admin
    # Implement your authentication logic; e.g., using Devise or JWT
    # For now, assume current_admin is set.
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_admin
  end
end
