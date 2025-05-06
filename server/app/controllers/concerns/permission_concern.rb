module PermissionConcern
  extend ActiveSupport::Concern

  included do
    # only run *after* authenticate_admin has set @current_admin
    before_action :set_effective_admin, if: -> { @current_admin.present? }
  end

  private

  # @real_admin = the logged-in user object (could be assistant)
  # @current_admin = the “data owner” whose records we actually touch
  def set_effective_admin
    @real_admin    = @current_admin
    @current_admin = @real_admin.assistant_admin? ? @real_admin.manager : @real_admin
  end
end
