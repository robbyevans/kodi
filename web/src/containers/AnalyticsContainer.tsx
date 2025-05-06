import React, { useEffect } from "react";
import { useAdmins } from "../redux/hooks/useAdmin";
import { usePayments } from "../redux/hooks/usePayment";
import AnalyticsPage from "../components/Analytics/Analytics";
import { getPropertyStats } from "../helpers/utils/getPropertyStats";
import { useProperties } from "../redux/hooks/useProperties";

const AnalyticsContainer: React.FC = () => {
  const { user } = useAdmins();
  const { data: propertyData, loading: propertyLoading } = useProperties();
  const {
    ledger,
    wallet,
    getWalletBalance,
    getLedgerEntries,
    loading: paymentsLoading,
  } = usePayments();

  useEffect(() => {
    // On mount, fetch wallet balance & ledger data
    getWalletBalance();
    getLedgerEntries();
    // ^ or pass month/year as needed
  }, []);

  const { paymentRate } = getPropertyStats(propertyData);

  return (
    <AnalyticsPage
      user={user}
      ledgerEntries={ledger}
      wallet={wallet}
      paymentRate={paymentRate}
      loading={propertyLoading && paymentsLoading}
    />
  );
};

export default AnalyticsContainer;
