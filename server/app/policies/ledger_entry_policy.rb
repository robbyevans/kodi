class LedgerEntryPolicy < ApplicationPolicy
  def index?
    user.real_admin? || user.can_view_finances?
  end

  def download_statement?
    index?
  end

  class Scope < Scope
    def resolve
      acting.wallet.ledger_entries
    end
  end
end
