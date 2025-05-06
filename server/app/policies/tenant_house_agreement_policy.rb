class TenantHouseAgreementPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      TenantHouseAgreement
        .joins(:property)
        .where(properties: { admin_id: acting.id })
    end
  end

  def index?   = user.real_admin? || user.can_view_tenants?
  def show?    = index?
  def create?  = user.real_admin? || user.can_create_tenants?
  def update?  = user.real_admin? || user.can_update_tenants?
  def destroy? = user.real_admin? || user.can_terminate_leases?
end
