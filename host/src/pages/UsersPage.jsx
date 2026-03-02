import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";

const UsersList = React.lazy(() => import("users_remote/UsersList"));

const LoadingSkeleton = () => (
  <div className="page-loading">
    <div className="page-loading__bar" />
    <div className="page-loading__bar" />
    <div className="page-loading__bar" />
  </div>
);

const UsersPage = () => (
  <div className="page">
    <div className="page__header">
      <h1 className="page__title">User Management</h1>
      <p className="page__subtitle">View and manage team members and roles</p>
    </div>
    <div className="page__content">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton />}>
          <UsersList />
        </Suspense>
      </ErrorBoundary>
    </div>
  </div>
);

export default UsersPage;
