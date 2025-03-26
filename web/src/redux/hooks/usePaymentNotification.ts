import { createConsumer } from "@rails/actioncable";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../utils";
import { showToast } from "../slices/toastSlice";
import { fetchLedgerEntries, fetchWalletBalance } from "../slices/paymentSlice";
import { fetchPropertyById } from "../slices/propertiesSlice";
import { useProperties } from "./useProperties";

const usePaymentNotifications = () => {
  const dispatch = useAppDispatch();
  const { data } = useProperties();
  const { propertyId } = useParams<{ propertyId: string }>();

  console.log("propertyId", propertyId);

  console.log("data", data);

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
              showToast({
                message: "Property updated with new payment!",
                type: "info",
              })
            );

            dispatch(fetchLedgerEntries());
            dispatch(fetchWalletBalance());
            dispatch(fetchPropertyById(Number(propertyId)));
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
