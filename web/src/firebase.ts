// File: /web/src/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { onMessage } from "firebase/messaging";
import { editAdmin } from "./redux/slices/adminSlice";

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
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      // Create a FormData instance to send the device_token
      const formData = new FormData();
      formData.append("admin[device_token]", token);
      formData.append("admin[is_notifications_allowed]", "true");

      // Dispatch the editAdmin action with FormData
      dispatch(editAdmin({ adminId, data: formData }));

      localStorage.setItem("notification_permission", "true");
    }

    return token;
  } catch (error) {
    console.error("Unable to get permission to notify.", error);
    return null;
  }
};

// // Listen when app is open
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("onMessage triggered with payload:", payload);
//       resolve(payload);
//     });
//   });
