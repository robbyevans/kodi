class HousePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.joins(:property)
           .where(properties: { admin_id: acting.id })
    end
  end

  def index? = user.real_admin? || user.can_view_houses?
  def show? = index?
  def create? = user.real_admin? || user.can_create_houses?
  def update? = user.real_admin? || user.can_update_houses?
  def destroy? = user.real_admin? || user.can_delete_houses?
end
