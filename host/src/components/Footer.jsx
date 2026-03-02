import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__links">
        <Link to="/">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/users">Users</Link>
        <Link to="/notifications">Notifications</Link>
      </div>
      <div className="footer__copy">
        Bug Tracker · Micro Frontend POC · Module Federation
      </div>
    </div>
  </footer>
);

export default Footer;
