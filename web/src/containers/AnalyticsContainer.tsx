// File: /web/src/containers/AnalyticsContainer.tsx
import React, { useEffect } from "react";
import { useAdmins } from "../redux/hooks/useAdmin";
import { usePayments } from "../redux/hooks/usePayment";
import AnalyticsPage from "../components/Analytics/Analytics";

const AnalyticsContainer: React.FC = () => {
  const { user } = useAdmins();
  const { ledger, wallet, getWalletBalance, getLedgerEntries, loading } =
    usePayments();

  useEffect(() => {
    // On mount, fetch wallet balance & ledger data
    getWalletBalance();
    getLedgerEntries();
    // ^ or pass month/year as needed
  }, []);

  console.log("edger", ledger);

  return (
    <AnalyticsPage
      user={user}
      ledgerEntries={ledger}
      wallet={wallet}
      loading={loading}
    />
  );
};

export default AnalyticsContainer;
