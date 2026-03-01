import React from "react";
import ReactDOM from "react-dom/client";
import AnalyticsWidget from "./AnalyticsWidget";

import "./index.css";

const App = () => (
  <div style={{ padding: "40px" }}>
    <AnalyticsWidget/>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)