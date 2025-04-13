import React, { useState } from "react";
import { usePayments } from "../../redux/hooks/usePayment";
import { useAdmins } from "../../redux/hooks/useAdmin";
import * as S from "./styles";

const WithdrawalForm: React.FC = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
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
    const amount = Number(withdrawAmount);
    if (!withdrawAmount || amount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }
    if (wallet && amount > Number(wallet.balance)) {
      alert("Insufficient wallet balance.");
      return;
    }

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

    initiateWithdrawalRequest(amount, withdrawalType, recipient_details);
  };

  return (
    <S.FormContainer>
      <S.FormTitle>Withdraw Funds</S.FormTitle>
      <S.BalanceText>
        Current Balance: KES{" "}
        {wallet ? Number(wallet.balance).toFixed(2) : "0.00"}
      </S.BalanceText>
      <S.Form onSubmit={handleSubmit}>
        <S.RadioGroup>
          <label>
            <input
              type="radio"
              value="mpesa"
              checked={withdrawalType === "mpesa"}
              onChange={() => setWithdrawalType("mpesa")}
            />{" "}
            MPesa
          </label>
          <label>
            <input
              type="radio"
              value="bank"
              checked={withdrawalType === "bank"}
              onChange={() => setWithdrawalType("bank")}
            />{" "}
            Bank Account
          </label>
        </S.RadioGroup>

        {withdrawalType === "mpesa" ? (
          <S.InputField
            type="text"
            placeholder="Mobile number for MPesa"
            value={
              user.phone_number ||
              "Update and verify your phone number in your profile"
            }
            disabled
          />
        ) : (
          <>
            <S.InputField
              type="text"
              placeholder="Bank Account Number"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
            />
            <S.InputField
              type="text"
              placeholder="Bank Code"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
            />
            <S.InputField
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </>
        )}

        <S.InputField
          type="number"
          placeholder="Amount to withdraw"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <S.SubmitButton type="submit" disabled={loading}>
          {loading ? "Processing..." : "Withdraw"}
        </S.SubmitButton>
      </S.Form>

      <S.TrustBadgeContainer>
        <a
          href="https://intasend.com/security"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-no-mpesa-hr-light.png"
            alt="IntaSend Secure Payments (PCI-DSS Compliant)"
          />
        </a>
        <strong>
          <a
            href="https://intasend.com/security"
            target="_blank"
            rel="noopener noreferrer"
          >
            Secured by IntaSend Payments
          </a>
        </strong>
      </S.TrustBadgeContainer>
    </S.FormContainer>
  );
};

export default WithdrawalForm;
