import React from "react";
import ReactDOM from "react-dom/client";
import {Suspense} from "react";
import ErrorBoundary from "./ErrorBoundary";

import "./index.css";


const AnalyticsWidget = React.lazy(() => import("analytics_remote/AnalyticsWidget"));
const UsersList = React.lazy(() => import("users_remote/UsersList"));
const NotificationsPanel = React.lazy(() => import("notifications_remote/NotificationPanel"));

const App = () => (
  <div className="container">
    <ErrorBoundary>
       <Suspense fallback={<div>Loading Analytics Widget...</div>}>
        <AnalyticsWidget />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Users List...</div>}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Notifications...</div>}>
        <NotificationsPanel />
      </Suspense>
    </ErrorBoundary>
   
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)