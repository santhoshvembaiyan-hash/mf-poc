import React from "react";
import { Link } from "react-router-dom";

const statCards = [
  {
    title: "Analytics",
    description: "Revenue, users & conversion metrics",
    to: "/analytics",
    icon: "📊",
    color: "card--blue",
  },
  {
    title: "Users",
    description: "Manage team members and roles",
    to: "/users",
    icon: "👥",
    color: "card--green",
  },
  {
    title: "Notifications",
    description: "Alerts and activity feed",
    to: "/notifications",
    icon: "🔔",
    color: "card--amber",
  },
];

const DashboardPage = () => (
  <div className="dashboard">
    <div className="dashboard__hero">
      <h1 className="dashboard__title">Welcome to POC</h1>
      <p className="dashboard__subtitle">
        Testing : Micro frontend dashboard — manage analytics, users, and notifications in one place.
      </p>
    </div>
    <div className="dashboard__grid">
      {statCards.map((card) => (
        <Link
          key={card.to}
          to={card.to}
          className={`dashboard__card ${card.color}`}
        >
          <span className="dashboard__card-icon" aria-hidden>{card.icon}</span>
          <h2 className="dashboard__card-title">{card.title}</h2>
          <p className="dashboard__card-desc">{card.description}</p>
          <span className="dashboard__card-cta">Open →</span>
        </Link>
      ))}
    </div>
    <div className="dashboard__info">
      <div className="dashboard__info-block">
        <strong>Module Federation</strong>
        <span>Remotes load on demand. Refresh the page after changing a remote.</span>
      </div>
    </div>
  </div>
);

export default DashboardPage;
