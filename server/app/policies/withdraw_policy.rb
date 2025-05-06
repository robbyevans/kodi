class WithdrawalPolicy < ApplicationPolicy
  def create? = user.real_admin? || user.can_withdraw_funds?
end
