// public/firebase-messaging-sw.js
/* global self */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAxW3Wpgp-nnEarEpZSZ8XoxrbQmEr347k",
  authDomain: "kodiapp-ef355.firebaseapp.com",
  projectId: "kodiapp-ef355",
  messagingSenderId: "218224739646",
  appId: "1:218224739646:web:b8987cb4727398c5b5186f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/kodi-old-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("push", function (event) {
//   const data = event.data.json();
//   const { property_name, house_number } = data;

//   const title = "💸 New Payment Received!";
//   const options = {
//     // body: `  New payment received `,
//     icon: "/kodi-logo192px.png",
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });
