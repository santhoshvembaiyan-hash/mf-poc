import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/analytics", label: "Analytics", icon: "📊" },
  { to: "/users", label: "Users", icon: "👥" },
  { to: "/notifications", label: "Notifications", icon: "🔔" },
];

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__logo">MF</span>
          <span className="navbar__title">POC</span>
        </NavLink>
        <nav className="navbar__nav">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              end={to === "/"}
            >
              <span className="navbar__link-icon" aria-hidden>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
