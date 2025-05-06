class WalletPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(admin_id: acting.id)
    end
  end

  # allow full-admins or assistants with finance rights
  def show? = user.real_admin? || user.can_view_payments?
end
