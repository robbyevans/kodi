import React from "react";
import * as S from "./styles";
import WithdrawalForm from "../WithdrawalForm/WithdrawalForm";
import { IUser } from "../../redux/slices/adminSlice";
import { ILedger } from "../../redux/slices/paymentSlice";

interface IAnalyticsProps {
  user: IUser;
  ledgerEntries: ILedger[];
  wallet: { balance: number } | null;
  loading: boolean;
}

const Analytics: React.FC<IAnalyticsProps> = ({
  user,
  ledgerEntries,
  wallet,
  // loading,
}) => {
  const totalDeposits = ledgerEntries
    .filter((item) => item.transaction_type === "deposit")
    .reduce((acc, cur) => acc + Number(cur.amount), 0); // use `cur.amount`

  const totalWithdrawals = ledgerEntries
    .filter((item) => item.transaction_type === "withdrawal")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const handleDownloadStatement = () => {
    // Suppose you have an endpoint: GET /ledger_entries/download_statement
    // Could do something like:
  };

  return (
    <S.AnalyticsContainer data-testid="analytics-page-container">
      <S.AnalyticsHeader>
        <h1>Analytics Dashboard</h1>
        <p>Welcome, {user.name || "Admin"}!</p>
      </S.AnalyticsHeader>

      {/* ========== Top Stats Cards ========== */}
      <S.StatsContainer>
        <S.StatCard>
          <S.StatTitle>Wallet Balance</S.StatTitle>
          <S.StatValue>KES {wallet ? wallet.balance : "0.00"}</S.StatValue>
          <S.StatSubtitle>Updated in real-time</S.StatSubtitle>
        </S.StatCard>

        <S.StatCard>
          <S.StatTitle>Total Deposits</S.StatTitle>
          <S.StatValue>KES {totalDeposits.toFixed(2)}</S.StatValue>
          <S.StatSubtitle>All time</S.StatSubtitle>
        </S.StatCard>

        <S.StatCard>
          <S.StatTitle>Total Withdrawals</S.StatTitle>
          <S.StatValue>KES {totalWithdrawals.toFixed(2)}</S.StatValue>
          <S.StatSubtitle>All time</S.StatSubtitle>
        </S.StatCard>
      </S.StatsContainer>

      {/* ========== Transaction Table ========== */}
      <S.SectionTitle>Recent Transactions</S.SectionTitle>
      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ledgerEntries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  {entry.transaction_type === "deposit"
                    ? "Rent Payment"
                    : "Self"}
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

      {/* Download Statement Button */}
      <S.DownloadButton onClick={handleDownloadStatement}>
        Download Statement
      </S.DownloadButton>

      {/* ========== Withdrawal Section ========== */}
      <S.SectionTitle>Make a Withdrawal</S.SectionTitle>
      <WithdrawalForm />

      {/* ========== Example: Additional Ledger Modal (optional) ========== */}
    </S.AnalyticsContainer>
  );
};

export default Analytics;
