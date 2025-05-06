class PaymentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(property_id: acting.properties.select(:id))
    end
  end

  def index? = user.real_admin? || user.can_view_payments?
  # …
end
