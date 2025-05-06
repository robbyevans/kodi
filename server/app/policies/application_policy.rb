class ApplicationPolicy
  attr_reader :user, :acting, :record

  def initialize(user, record)
    @user    = user
    @acting  = user.effective_admin
    @record  = record
  end

  def index? = false
  def show? = scope.exists?(id: record.id)
  def create? = false
  def new? = create?
  def update? = false
  def edit? = update?
  def destroy? = false

  def scope
    Pundit.policy_scope!(user, record.class)
  end

  class Scope
    attr_reader :user, :acting, :scope

    def initialize(user, scope)
      @user   = user
      @acting = user.effective_admin
      @scope  = scope
    end

    # default: only records with admin_id = acting.id
    def resolve
      scope.where(admin_id: acting.id)
    end
  end
end
