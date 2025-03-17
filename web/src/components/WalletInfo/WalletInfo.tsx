// File: /web/src/components/WalletInfo/WalletInfo.tsx
import React, { useEffect } from "react";
import { usePayments } from "../../redux/hooks/usePayment";
import * as S from "./styles";

const WalletInfo: React.FC = () => {
  const { wallet, getWalletBalance, loading, error } = usePayments();

  useEffect(() => {
    getWalletBalance();
  }, []);

  return (
    <S.WalletContainer>
      <S.WalletHeader>
        <h2>Wallet Balance</h2>
      </S.WalletHeader>
      {loading ? (
        <p>Loading wallet balance...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <S.WalletBalance>
          KES {wallet ? Number(wallet.balance).toFixed(2) : "0.00"}
        </S.WalletBalance>
      )}
      <S.StatementButton
        onClick={() =>
          window.open("/ledger_entries/download_statement", "_blank")
        }
      >
        Download Statement
      </S.StatementButton>
    </S.WalletContainer>
  );
};

export default WalletInfo;
