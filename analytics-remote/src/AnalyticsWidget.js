import React from "react";

const AnalyticsWidget = () => {
  return (
    <div style={{
      padding: "20px",
      background: "#f5f7fa",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "20px"
    }}>
      <h2>📊 Analytics Overview</h2>
      <div style={{ marginTop: "10px" }}>
        <p><strong>Total Revenue:</strong> $48,320</p>
        <p><strong>Active Users:</strong> 2,134</p>
        <p><strong>Conversion Rate:</strong> 4.2%</p>
      </div>
    </div>
  );
};

export default AnalyticsWidget;