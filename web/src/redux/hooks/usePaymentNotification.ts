import { createConsumer } from "@rails/actioncable";
import { useEffect } from "react";
import { useAppDispatch } from "../utils";
import { showToast } from "../slices/toastSlice";
import { fetchPaymentsByProperty } from "../slices/paymentSlice";
import { useProperties } from "./useProperties";

const usePaymentNotifications = () => {
  const dispatch = useAppDispatch(); // Use your typed dispatch
  const { data } = useProperties();
  // Make sure data has a propertyId. Adjust as necessary.
  const propertyId = data?.[0]?.unique_id;

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const cableUrl = `${import.meta.env.VITE_API_URL}/cable?token=${token}`;
    const consumer = createConsumer(cableUrl);

    const subscription = consumer.subscriptions.create(
      { channel: "PaymentsChannel" },
      {
        received(data) {
          if (data.payment) {
            console.log("Received broadcast data:", data);
            dispatch(
              showToast({ message: "New payment received!", type: "success" })
            );
            if (propertyId) {
              dispatch(fetchPaymentsByProperty(propertyId.toString()));
            }
          }
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, propertyId]);

  return null;
};

export default usePaymentNotifications;
