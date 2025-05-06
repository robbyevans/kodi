class AssistantAdminPolicy < ApplicationPolicy
  # Only full‐admins may list or create/update/delete assistants
  def index?
    user.real_admin?
  end

  def create?
    user.real_admin?
  end

  def update?
    user.real_admin?
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
