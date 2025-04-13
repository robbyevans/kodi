// File: /web/src/components/Analytics/Analytics.tsx

import React, { useEffect, useState } from "react";
import * as S from "./styles";
import WithdrawalForm from "../WithdrawalForm/WithdrawalForm";
import { IUser } from "../../redux/slices/adminSlice";
import { ILedger } from "../../redux/slices/paymentSlice";
import AnalyticsSkeleton from "./AnalyticsSkeleton";
import SwiperHOC from "../SwiperHOC/SwiperHOC";

interface IAnalyticsProps {
  user: IUser;
  ledgerEntries: ILedger[];
  wallet: { balance: number } | null;
  loading: boolean;
  paymentRate: number;
}

const Analytics: React.FC<IAnalyticsProps> = ({
  user,
  ledgerEntries,
  wallet,
  loading,
  paymentRate,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check viewport width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentMonthLedgerEntries = ledgerEntries.filter((entry) => {
    const entryDate = new Date(entry.created_at);
    return (
      entryDate.getMonth() === currentDate.getMonth() &&
      entryDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const totalDeposits = currentMonthLedgerEntries
    .filter((item) => item.transaction_type === "deposit")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const totalWithdrawals = currentMonthLedgerEntries
    .filter((item) => item.transaction_type === "withdrawal")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const handleDownloadStatement = () => {
    // Implementation for download statement goes here.
  };

  // Define the stat cards array
  const statCards = [
    <S.StatCard key="wallet">
      <S.StatTitle>Wallet Balance</S.StatTitle>
      <S.StatValue>KES {wallet ? wallet.balance : "0.00"}</S.StatValue>
      <S.StatSubtitle>Updated in real-time</S.StatSubtitle>
    </S.StatCard>,
    <S.StatCard key="deposits">
      <S.StatTitle>{`Total Deposits for ${currentMonthName}`}</S.StatTitle>
      <S.StatValue>KES {totalDeposits.toFixed(2)}</S.StatValue>
      <S.StatSubtitle>{`${currentMonthName} Deposits`}</S.StatSubtitle>
      <S.PaymentRateBadge rate={paymentRate}>{paymentRate}%</S.PaymentRateBadge>
    </S.StatCard>,
    <S.StatCard key="withdrawals">
      <S.StatTitle>{`Total Withdrawals for ${currentMonthName}`}</S.StatTitle>
      <S.StatValue>KES {totalWithdrawals.toFixed(2)}</S.StatValue>
      <S.StatSubtitle>{`${currentMonthName} Withdrawals`}</S.StatSubtitle>
    </S.StatCard>,
  ];

  return loading ? (
    <AnalyticsSkeleton />
  ) : (
    <S.AnalyticsContainer data-testid="analytics-page-container">
      <S.AnalyticsHeader>
        <h1>Analytics Dashboard</h1>
        <p>Welcome, {user.name || "Admin"}!</p>
      </S.AnalyticsHeader>

      {isMobile ? (
        // On mobile, use the SwiperHOC to enable horizontal scrolling.
        // Use slidesPerView set to 2 and spaceBetween of 20px.
        <SwiperHOC slidesPerView={1.35} spaceBetween={10}>
          {statCards}
        </SwiperHOC>
      ) : (
        // On desktop, use a regular flex container.
        <S.StatsContainer>{statCards}</S.StatsContainer>
      )}

      <S.SectionTitle>{`Recent Transactions for ${currentMonthName}`}</S.SectionTitle>
      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentMonthLedgerEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.transaction_id}</td>
                <td>
                  {entry.transaction_type === "deposit"
                    ? `${entry.property_uid}#${entry.house_number}`
                    : "withdrawal"}
                </td>
                <td>{new Date(entry.created_at).toLocaleString()}</td>
                <td>KES {Number(entry.amount).toFixed(2)}</td>
                <td>
                  {entry.transaction_type === "deposit" ? (
                    <S.StatusPill color="#27ae60">Deposit</S.StatusPill>
                  ) : (
                    <S.StatusPill color="#c0392b">Withdrawal</S.StatusPill>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>

      <S.DownloadButton onClick={handleDownloadStatement}>
        Download Statement
      </S.DownloadButton>

      <WithdrawalForm />
    </S.AnalyticsContainer>
  );
};

export default Analytics;
