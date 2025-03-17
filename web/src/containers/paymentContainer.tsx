// File: /web/src/containers/paymentContainer.tsx

import React, { useState, useEffect } from "react";
import { usePayments } from "../redux/hooks/usePayment";
import { IPayment } from "../redux/slices/paymentSlice";

const PaymentContainer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [propertyId, setPropertyId] = useState<string>("");
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number | undefined>(undefined);

  const {
    data: payments,
    loading,
    error,
    getPaymentsByProperty,
    getMonthlyPayments,
    getYearlyPayments,
    getAllPayments,
  } = usePayments();

  // On initial load, fetch all payments (system admin view) for the current year
  useEffect(() => {
    getAllPayments(year, month);
  }, [year, month, getAllPayments]);

  // Handler for fetching payments by property only (no date filter)
  const handleFetchByPropertyOnly = () => {
    if (propertyId.trim()) {
      getPaymentsByProperty(propertyId.trim());
    }
  };

  // Handler for fetching monthly payments (property, month and year)
  const handleFetchMonthly = () => {
    if (propertyId.trim() && month !== undefined && year) {
      getMonthlyPayments(propertyId.trim(), month, year);
    }
  };

  // Handler for fetching yearly payments (property and year)
  const handleFetchYearly = () => {
    if (propertyId.trim() && year) {
      getYearlyPayments(propertyId.trim(), year);
    }
  };

  // Handler for fetching all payments (system admin view)
  const handleFetchAll = () => {
    getAllPayments(year, month);
  };

  // Reset filter to default: system admin view (all payments for current year, no month filter)
  const handleResetFilter = () => {
    setPropertyId("");
    setYear(currentYear);
    setMonth(undefined);
    getAllPayments(currentYear, undefined);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Payment Data</h1>
      <div
        style={{
          marginBottom: "1rem",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        <h2>Filter Payments</h2>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Property ID:{" "}
            <input
              type="text"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              placeholder="(Leave empty for all payments)"
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Year:{" "}
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              placeholder="e.g., 2025"
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Month (optional):{" "}
            <input
              type="number"
              value={month || ""}
              onChange={(e) => {
                const val = e.target.value;
                setMonth(val ? Number(val) : undefined);
              }}
              placeholder="1-12"
              min="1"
              max="12"
            />
          </label>
        </div>
        <div>
          <button onClick={handleFetchAll}>Fetch All Payments</button>
          <button
            onClick={handleFetchByPropertyOnly}
            style={{ marginLeft: "0.5rem" }}
          >
            Fetch by Property Only
          </button>
          <button onClick={handleFetchMonthly} style={{ marginLeft: "0.5rem" }}>
            Fetch Monthly Payments
          </button>
          <button onClick={handleFetchYearly} style={{ marginLeft: "0.5rem" }}>
            Fetch Yearly Payments
          </button>
          <button onClick={handleResetFilter} style={{ marginLeft: "0.5rem" }}>
            Reset Filter
          </button>
        </div>
      </div>

      <div>
        {loading && <p>Loading payments...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && payments && payments.length > 0 ? (
          <div>
            <h2>Payments:</h2>
            <ul>
              {payments.map((payment: IPayment) => (
                <li key={payment.transaction_id}>
                  <strong>ID:</strong> {payment.transaction_id} |{" "}
                  <strong>Bill Ref:</strong> {payment.bill_ref_number} |{" "}
                  <strong>Amount:</strong> {payment.transaction_amount} |{" "}
                  <strong>Date:</strong>{" "}
                  {new Date(payment.payment_date).toLocaleString()} |{" "}
                  <strong>Property ID:</strong> {payment.property_id} |{" "}
                  <strong>House:</strong> {payment.house_number} |{" "}
                  <strong>Settled:</strong> {payment.settled ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !loading && <p>No payment data available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentContainer;
