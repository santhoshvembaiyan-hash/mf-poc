import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";

const NotificationsPanel = React.lazy(() => import("notifications_remote/NotificationPanel"));

const LoadingSkeleton = () => (
  <div className="page-loading">
    <div className="page-loading__bar" />
    <div className="page-loading__bar" />
    <div className="page-loading__bar" />
  </div>
);

const NotificationsPage = () => (
  <div className="page">
    <div className="page__header">
      <h1 className="page__title">Notifications</h1>
      <p className="page__subtitle">Recent activity and system alerts</p>
    </div>
    <div className="page__content">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton />}>
          <NotificationsPanel />
        </Suspense>
      </ErrorBoundary>
    </div>
  </div>
);

export default NotificationsPage;
