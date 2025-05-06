class AssistantAdminPolicy < ApplicationPolicy
  # Only full‐admins may list or create assistants
  def index?
    user.real_admin?
  end

  def create?
    user.real_admin?
  end

  # To update or destroy an assistant record:
  # – full‐admins always
  # – assistants only if they have can_manage_tenants
  def update?
    user.real_admin? || (user.assistant_admin? && user.can_manage_tenants?)
  end
  alias edit? update?

  def destroy?
    update?
  end

  class Scope < Scope
    def resolve
      # only the acting_admin’s own assistants
      scope.where(manager_id: acting.id)
    end
  end
end
