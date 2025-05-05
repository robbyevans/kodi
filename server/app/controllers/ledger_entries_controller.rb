class LedgerEntriesController < ApplicationController
  # GET /ledger_entries
  def index
    authorize LedgerEntry
    @entries = policy_scope(LedgerEntry).order(created_at: :desc)
    render json: @entries
  end

  # GET /ledger_entries/download_statement
  def download_statement
    authorize LedgerEntry, :index?
    entries = policy_scope(LedgerEntry).order(created_at: :desc)

    pdf = Prawn::Document.new
    pdf.text "Account Statement for #{current_admin.name}", size: 20, style: :bold
    pdf.move_down 20

    data = [['Date', 'Type', 'Amount', 'Balance After', 'Description']]
    entries.each do |e|
      data << [
        e.created_at.strftime('%Y-%m-%d %H:%M'),
        e.transaction_type.capitalize,
        format('%.2f', e.amount),
        format('%.2f', e.balance_after),
        e.description.to_s
      ]
    end
    pdf.table(data, header: true, row_colors: %w[F0F0F0 FFFFFF])
    send_data pdf.render, filename: 'account_statement.pdf',
                          type: 'application/pdf',
                          disposition: 'attachment'
  end
end
