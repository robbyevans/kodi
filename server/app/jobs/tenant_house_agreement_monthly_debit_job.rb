class TenantHouseAgreementMonthlyDebitJob < ApplicationJob
  def perform
    TenantHouseAgreement.where(status: 'active').find_each do |agreement|
      next unless agreement.active? && agreement.monthly_rent.to_f.positive?

      agreement.debit!(agreement.monthly_rent)
      Rails.logger.info "Debited #{agreement.monthly_rent} from Agreement #{agreement.id}"
    rescue StandardError => e
      Rails.logger.error "Error debiting Agreement #{agreement.id}: #{e.message}"
    end
  end
end
