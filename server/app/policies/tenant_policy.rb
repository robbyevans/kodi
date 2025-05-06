class TenantPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      Tenant
        .joins(houses: :property)
        .where(properties: { admin_id: acting.id })
        .distinct
    end
  end

  def index? = user.real_admin? || user.can_view_tenants?
  def show? = index?
  def create? = user.real_admin? || user.can_create_tenants?
  def update? = user.real_admin? || user.can_update_tenants?
  def destroy? = user.real_admin? || user.can_terminate_leases?
end
