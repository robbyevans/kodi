import { createConsumer } from "@rails/actioncable";
import { useEffect } from "react";
import { useAppDispatch } from "../utils";
import { showToast } from "../slices/toastSlice";
import { fetchLedgerEntries, fetchWalletBalance } from "../slices/paymentSlice";
import axiosInstance from "../utils";
import { fetchPropertyById } from "../slices/propertiesSlice";

const usePaymentNotifications = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const cableUrl = `${import.meta.env.VITE_API_URL}/cable?token=${token}`;
    const consumer = createConsumer(cableUrl);

    const subscription = consumer.subscriptions.create(
      { channel: "PaymentsChannel" },
      {
        received: async (data) => {
          if (data.payment) {
            const { property_id, house_number } = data.payment;
            console.log("data", data);
            try {
              // Get property name
              const res = await axiosInstance.get(`/properties/${property_id}`);
              const propertyName = res.data.name;
              console.log("propertyName", propertyName);
              console.log("house_number", house_number);

              // Show toast
              dispatch(
                showToast({
                  message: `💰 New Payment Received`,
                  type: "info",
                })
              );

              // // Show browser notification -->> to be revisited (we currently use server side firebase notification )
              // if (Notification.permission === "granted") {
              //   navigator.serviceWorker.ready.then((registration) => {
              //     registration.showNotification("New Payment Received!", {
              //       body: `You have received KES ${transaction_amount} from ${propertyName}, House ${house_number}`,
              //       icon: "/kodi-logo192px.png",
              //     });
              //   });
              // }

              // Refresh ledger, wallet and property
              dispatch(fetchLedgerEntries());
              dispatch(fetchWalletBalance());
              dispatch(fetchPropertyById(property_id));
            } catch (error) {
              console.error("Failed to fetch property name", error);
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
