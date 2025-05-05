class TenantNotificationHistoryPolicy < ApplicationPolicy
  # Only full‐admins or assistants with the flag can send notifications
  def create?
    user.real_admin? || user.can_send_notifications?
  end
  alias_method :new?, :create?

  # You can list/show histories if you can send
  def index?
    create?
  end
  def show?
    index?
  end

  class Scope < Scope
    def resolve
      # only histories belonging to acting_admin
      scope.where(admin_id: acting.id)
    end
  end
end
