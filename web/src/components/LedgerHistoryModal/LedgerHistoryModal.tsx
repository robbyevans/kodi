import React, { useEffect, useState } from "react";
import ModalOverlay from "../Modals/ModalOverlay/ModalOverlay";
import * as S from "./styles"; // We'll create some basic styles below
import axiosInstance from "../../redux/utils";

export interface ILedgerEntry {
  id: number;
  transaction_type: string;
  amount: number;
  balance_after: number;
  description: string;
  created_at: string;
}

interface LedgerHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LedgerHistoryModal: React.FC<LedgerHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [ledgerEntries, setLedgerEntries] = useState<ILedgerEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axiosInstance
        .get("/ledger_entries")
        .then((response) => {
          setLedgerEntries(response.data);
          setLoading(false);
        })
        .catch((err: any) => {
          setError(`Failed to fetch ledger entries.${err}`);
          setLoading(false);
        });
    }
  }, [isOpen]);

  const downloadStatement = () => {
    window.open("/ledger_entries/download_statement", "_blank");
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>Ledger History</h2>
          <button onClick={onClose}>X</button>
        </S.ModalHeader>
        <S.ModalBody>
          {loading && <p>Loading ledger entries...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance After</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{new Date(entry.created_at).toLocaleString()}</td>
                    <td>{entry.transaction_type.toUpperCase()}</td>
                    <td>{entry.amount.toFixed(2)}</td>
                    <td>{entry.balance_after.toFixed(2)}</td>
                    <td>{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </S.ModalBody>
        <S.ModalFooter>
          <button onClick={downloadStatement}>Download Statement PDF</button>
        </S.ModalFooter>
      </S.ModalContent>
    </ModalOverlay>
  );
};

export default LedgerHistoryModal;
