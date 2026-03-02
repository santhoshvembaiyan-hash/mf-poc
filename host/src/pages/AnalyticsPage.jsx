import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";

const AnalyticsWidget = React.lazy(() => import("analytics_remote/AnalyticsWidget"));

const LoadingSkeleton = () => (
  <div className="page-loading">
    <div className="page-loading__bar" />
    <div className="page-loading__bar" />
    <div className="page-loading__bar" />
  </div>
);

const AnalyticsPage = () => (
  <div className="page">
    <div className="page__header">
      <h1 className="page__title">Analytics Overview</h1>
      <p className="page__subtitle">Track revenue, users, and conversion metrics</p>
    </div>
    <div className="page__content">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton />}>
          <AnalyticsWidget />
        </Suspense>
      </ErrorBoundary>
    </div>
  </div>
);

export default AnalyticsPage;
