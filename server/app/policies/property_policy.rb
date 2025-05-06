class PropertyPolicy < ApplicationPolicy
  def index? = user.real_admin? || user.can_view_properties?
  def show? = index?
  def create? = user.real_admin? || user.can_create_properties?
  def update? = user.real_admin? || user.can_update_properties?
  def destroy? = user.real_admin? || user.can_delete_properties?
end
