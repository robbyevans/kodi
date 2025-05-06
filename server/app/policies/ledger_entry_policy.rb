class LedgerEntryPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      acting.wallet.ledger_entries
    end
  end

  def index? = user.real_admin? || user.can_view_payments?
  def download_statement? = index?
end
