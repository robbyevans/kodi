// File: /web/src/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and save device token
export const requestFirebaseNotificationPermission = async (
  dispatch: any,
  adminId: number
) => {
  try {
    console.log(
      "Requesting Firebase token with vapidKey:",
      import.meta.env.VITE_FIREBASE_VAPID_KEY
    );
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    console.log("Firebase Token received:", token);

    if (token) {
      dispatch({
        type: "admin/editAdmin",
        payload: {
          adminId,
          data: {
            is_notifications_allowed: true,
            device_token: token,
          },
        },
      });
      localStorage.setItem("notification_permission", "true");
      console.log("Dispatched update for admin with token.");
    }

    return token;
  } catch (error) {
    console.error("Unable to get permission to notify.", error);
    return null;
  }
};

// Listen when app is open
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("onMessage triggered with payload:", payload);
      resolve(payload);
    });
  });
