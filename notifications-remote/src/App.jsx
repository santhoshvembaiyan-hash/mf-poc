import React from "react";
import ReactDOM from "react-dom/client";
import NotificationPanel from "./NotificationPanel";

import "./index.css";

const App = () => (
  <div className="container">
    <NotificationPanel/>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)