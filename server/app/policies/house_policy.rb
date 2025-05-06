class HousePolicy < ApplicationPolicy
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

  class Scope < Scope
    def resolve
      # all houses under acting_admin’s properties
      scope.joins(:property).where(properties: { admin_id: acting.id })
    end
  end
end
