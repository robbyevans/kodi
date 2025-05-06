class PropertyPolicy < ApplicationPolicy
  def index?
    user.real_admin? || user.can_view_full_records?
  end

  def show?
    index?
  end

  def create?
    user.real_admin? || user.can_manage_tenants?
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  # inherits default Scope#resolve
end
