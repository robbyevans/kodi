import { createConsumer } from "@rails/actioncable";
import { useEffect } from "react";
import { useAppDispatch } from "../utils";
import { showToast } from "../slices/toastSlice";
import { fetchPropertyById } from "../slices/propertiesSlice";
import { fetchLedgerEntries, fetchWalletBalance } from "../slices/paymentSlice";

const usePaymentNotifications = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const cableUrl = `${import.meta.env.VITE_API_URL}/cable?token=${token}`;
    const consumer = createConsumer(cableUrl);

    const subscription = consumer.subscriptions.create(
      { channel: "PaymentsChannel" },
      {
        received(data) {
          if (data.payment) {
            dispatch(
              showToast({
                message: "New payment received!",
                type: "info",
              })
            );

            dispatch(fetchLedgerEntries());
            dispatch(fetchWalletBalance());

            const { property_id } = data.payment;
            const correctedPropertyId = Number(property_id - 1000);

            if (property_id) {
              dispatch(fetchPropertyById(correctedPropertyId));
            }
          }
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default usePaymentNotifications;
