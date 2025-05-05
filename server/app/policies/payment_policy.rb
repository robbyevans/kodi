class PaymentPolicy < ApplicationPolicy
  # GET /payments
  def index?
    # full‐admins always, assistants only if they have the finance flag
    user.real_admin? || user.can_view_finances?
  end

  # We don't authorize #ipn here since it's a public webhook

  class Scope < Scope
    def resolve
      # only payments for properties belonging to the acting_admin
      scope.where(property_id: acting.properties.select(:id))
    end
  end
end
