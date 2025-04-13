import React, { useState } from "react";
import { usePayments } from "../../redux/hooks/usePayment";
import { useAdmins } from "../../redux/hooks/useAdmin";

const WithdrawalForm: React.FC = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawalType, setWithdrawalType] = useState<"mpesa" | "bank">(
    "mpesa"
  );

  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountName, setAccountName] = useState("");

  const { wallet, initiateWithdrawalRequest, loading } = usePayments();
  const { user } = useAdmins();

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

    // Build recipient details based on withdrawal type
    let recipient_details = {};

    if (withdrawalType === "bank") {
      if (
        !bankAccountNumber.trim() ||
        !bankCode.trim() ||
        !accountName.trim()
      ) {
        alert("Please fill in all bank account details.");
        return;
      }
      recipient_details = {
        account_number: bankAccountNumber,
        bank_code: bankCode,
        account_name: accountName,
      };
    } else if (withdrawalType === "mpesa") {
      if (!user.phone_number) {
        alert(
          "Your profile does not have a phone number, please update your profile."
        );
        return;
      }
      recipient_details = { mpesa_number: user.phone_number };
    }

    initiateWithdrawalRequest(
      withdrawAmount,
      withdrawalType,
      recipient_details
    );
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
        <div>
          <label>
            <input
              type="radio"
              value="mpesa"
              checked={withdrawalType === "mpesa"}
              onChange={() => setWithdrawalType("mpesa")}
            />{" "}
            MPesa
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="bank"
              checked={withdrawalType === "bank"}
              onChange={() => setWithdrawalType("bank")}
            />{" "}
            Bank Account
          </label>
        </div>
        {withdrawalType === "mpesa" ? (
          <div>
            <input
              type="text"
              placeholder="Mobile number for MPesa"
              value={
                user.phone_number ||
                "Update and verify your phone number in your profile"
              }
              disabled
              style={{
                padding: "0.5rem",
                width: "100%",
                margin: "0.5rem 0",
                backgroundColor: "#eee",
              }}
            />
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Bank Account Number"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              style={{ padding: "0.5rem", width: "100%", margin: "0.5rem 0" }}
            />
            <input
              type="text"
              placeholder="Bank Code"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              style={{ padding: "0.5rem", width: "100%", margin: "0.5rem 0" }}
            />
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              style={{ padding: "0.5rem", width: "100%", margin: "0.5rem 0" }}
            />
          </div>
        )}
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

      <span
        style={{
          display: "block",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          marginTop: "20px",
        }}
      >
        <a
          href="https://intasend.com/security"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-no-mpesa-hr-light.png"
            style={{ width: "100%", maxWidth: "375px", height: "auto" }}
            alt="IntaSend Secure Payments (PCI-DSS Compliant)"
          />
        </a>
        <strong>
          <a
            style={{
              display: "block",
              color: "#454545",
              textDecoration: "none",
              fontSize: "0.8em",
              marginTop: "0.6em",
            }}
            href="https://intasend.com/security"
            target="_blank"
            rel="noopener noreferrer"
          >
            Secured by IntaSend Payments
          </a>
        </strong>
      </span>
    </div>
  );
};

export default WithdrawalForm;
