import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./Router/AppRouter";
import HOCWrapper from "./components/HOCWrapper";
import OfflinePage from "./components/OfflinePage/OfflinePage";

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      console.log("✅ Internet reconnected");
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log("⚠️ Lost internet connection");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    <Router>
      <HOCWrapper>
        <AppRouter />
      </HOCWrapper>
    </Router>
  );
};

export default App;
