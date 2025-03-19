import { createConsumer } from "@rails/actioncable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../slices/toastSlice";
// Optionally, import an action to add the new payment to your state:
// import { addPayment } from '../redux/slices/paymentSlice';

const usePaymentNotifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the auth token from localStorage (or wherever you store it)
    const token = localStorage.getItem("auth_token");
    // Construct the cable URL; adjust VITE_API_URL if necessary.
    const cableUrl = `${import.meta.env.VITE_API_URL}/cable?token=${token}`;
    const consumer = createConsumer(cableUrl);

    // Subscribe to the PaymentsChannel
    const subscription = consumer.subscriptions.create(
      { channel: "PaymentsChannel" },
      {
        received(data) {
          if (data.payment) {
            console.log("Received broadcast data:", data);
            // Dispatch a toast notification
            dispatch(
              showToast({ message: "New payment received!", type: "success" })
            );
            // Optionally, update your Redux state with the new payment data:
            // dispatch(addPayment(data.payment));
          }
        },
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default usePaymentNotifications;
