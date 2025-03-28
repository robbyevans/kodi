// /web/src/redux/hooks/usePaymentNotification.ts
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
            const { property_id, property_name, house_number } = data.payment;

            dispatch(
              showToast({
                message: `Payment from ${property_name}, House ${house_number}`,
                type: "info",
              })
            );

            if (Notification.permission === "granted") {
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("New Payment Received!", {
                  body: `Received payment from ${property_name}, House ${house_number}`,
                  icon: "/kodi-logo192px.png",
                });
              });
            }

            dispatch(fetchLedgerEntries());
            dispatch(fetchWalletBalance());

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
