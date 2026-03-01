import React from "react";

const notifications = [
  { id: 1, message: "New user registered." },
  { id: 2, message: "Server CPU usage high." },
  { id: 3, message: "Database backup completed." },
];

const NotificationPanel = () => {
  return (
    <div
      style={{
        padding: "20px",
        background: "#fff3cd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h2>🔔 Notifications</h2>
      <ul style={{ marginTop: "10px" }}>
        {notifications.map((note) => (
          <li key={note.id}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;