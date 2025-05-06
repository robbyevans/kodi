class TenantNotificationHistoryPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      # only histories belonging to acting_admin
      scope.where(admin_id: acting.id)
    end
  end

  def create? = user.real_admin? || user.can_send_notifications?
  def index? = user.real_admin? || user.can_view_notification_history?
  def show? = index?
end
