// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAxW3Wpgp-nnEarEpZSZ8XoxrbQmEr347k",
  authDomain: "kodiapp-ef355.firebaseapp.com",
  projectId: "kodiapp-ef355",
  storageBucket: "kodiapp-ef355.appspot.com",
  messagingSenderId: "218224739646",
  appId: "1:218224739646:web:b8987cb4727398c5b5186f",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 👇 You'll use this to get permission and device token
export const requestFirebaseNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BDHL0IcoIsPkwGOJ5IvvW4hRdQRnsXIPvEoLFPW3lDbxNQJ6zHeQBhCkDTeluy1WEWrxnDgjGLzyYbzLzm4Np2U",
    });

    console.log("Firebase Token:", token);
    return token;
  } catch (error) {
    console.error("Unable to get permission to notify.", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
