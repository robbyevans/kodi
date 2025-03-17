// File: /web/src/components/WithdrawalForm/WithdrawalForm.tsx
import React, { useState } from "react";
import { usePayments } from "../../redux/hooks/usePayment";
// import * as S from "./styles"; // Create your own styles or use inline styles

const WithdrawalForm: React.FC = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const { wallet, initiateWithdrawalRequest, loading } = usePayments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }
    if (wallet && withdrawAmount > Number(wallet.balance)) {
      alert("Insufficient wallet balance.");
      return;
    }
    initiateWithdrawalRequest(withdrawAmount);
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "1rem",
      }}
    >
      <h3>Withdraw Funds</h3>
      <p>
        Current Balance: KES{" "}
        {wallet ? Number(wallet.balance).toFixed(2) : "0.00"}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount to withdraw"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.5rem 1rem" }}
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;
