class AdminPolicy < ApplicationPolicy
  # index: only full admins can list other admins
  def index?
    user.real_admin?
  end

  def show?
    # an admin can fetch their own record, or full‐admin can fetch any
    user.real_admin? || record.id == user.id
  end

  def create?
    # only full‐admins can sign up new admins via this endpoint
    user.real_admin?
  end

  def update?
    # full‐admin or editing their own profile
    user.real_admin? || record.id == user.id
  end

  def destroy?
    # only full‐admins can delete an admin
    user.real_admin?
  end

  class Scope < Scope
    def resolve
      if user.real_admin?
        scope.all
      else
        # assistant_admins shouldn’t see other admins
        scope.where(id: user.id)
      end
    end
  end
end
