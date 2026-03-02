import React, { useState, useMemo } from "react";
import "./index.css";

const TYPES = [
  { id: "info", label: "Info", icon: "ℹ️" },
  { id: "warning", label: "Warning", icon: "⚠️" },
  { id: "success", label: "Success", icon: "✅" },
];

const initialNotifications = [
  { id: 1, message: "New user registered.", read: false, type: "info", createdAt: Date.now() - 3600000 },
  { id: 2, message: "Server CPU usage high.", read: false, type: "warning", createdAt: Date.now() - 1800000 },
  { id: 3, message: "Database backup completed.", read: true, type: "success", createdAt: Date.now() - 86400000 },
];

const formatTime = (ts) => {
  const d = Date.now() - ts;
  if (d < 60000) return "Just now";
  if (d < 3600000) return `${Math.floor(d / 60000)} min ago`;
  if (d < 86400000) return `${Math.floor(d / 3600000)} hr ago`;
  if (d < 604800000) return `${Math.floor(d / 86400000)} day ago`;
  return "Older";
};

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState("info");
  const [filter, setFilter] = useState("all"); // all | unread | read

  const filtered = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => !n.read);
    if (filter === "read") return notifications.filter((n) => n.read);
    return notifications;
  }, [notifications, filter]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed) return;
    const id = Math.max(0, ...notifications.map((n) => n.id)) + 1;
    setNotifications([
      { id, message: trimmed, read: false, type: newType || "info", createdAt: Date.now() },
      ...notifications,
    ]);
    setNewMessage("");
    setNewType("info");
  };

  const handleDismiss = (id) => setNotifications(notifications.filter((n) => n.id !== id));

  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));

  const clearAllRead = () => setNotifications(notifications.filter((n) => !n.read));

  const hasRead = notifications.some((n) => n.read);

  return (
    <div className="notifications-widget">
      <h2 className="notifications-widget__title">
        <span className="notifications-widget__title-icon" aria-hidden>🔔</span>
        Notification
        {unreadCount > 0 && (
          <span className="notifications-widget__unread-badge">{unreadCount}</span>
        )}
      </h2>

      <form className="notifications-widget__form" onSubmit={handleAdd}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add a notification..."
          maxLength={200}
          className="notifications-widget__form-input"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="notifications-widget__form-type"
          aria-label="Type"
        >
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
          ))}
        </select>
        <button type="submit" disabled={!newMessage.trim()}>Add</button>
      </form>

      <div className="notifications-widget__toolbar">
        <div className="notifications-widget__tabs">
          {["all", "unread", "read"].map((f) => (
            <button
              key={f}
              type="button"
              className={`notifications-tab ${filter === f ? "notifications-tab--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="notifications-widget__actions">
          <button type="button" className="notifications-list__btn" onClick={markAllRead}>
            Mark all read
          </button>
          {hasRead && (
            <button type="button" className="notifications-list__btn notifications-list__btn--dismiss" onClick={clearAllRead}>
              Clear read
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="notifications-empty">
          {filter === "all" ? "No notifications. Add one above." : `No ${filter} notifications.`}
        </div>
      ) : (
        <ul className="notifications-list">
          {filtered.map((note) => (
            <li
              key={note.id}
              className={`notifications-list__item ${note.read ? "notifications-list__item--read" : ""} notifications-list__item--${note.type || "info"}`}
            >
              <div className="notifications-list__content">
                <span className="notifications-list__message">{note.message}</span>
                <span className="notifications-list__time">{formatTime(note.createdAt || 0)}</span>
              </div>
              <div className="notifications-list__actions">
                <button
                  type="button"
                  className="notifications-list__btn"
                  onClick={() => handleToggleRead(note.id)}
                  title={note.read ? "Mark unread" : "Mark read"}
                >
                  {note.read ? "Unread" : "Read"}
                </button>
                <button
                  type="button"
                  className="notifications-list__btn notifications-list__btn--dismiss"
                  onClick={() => handleDismiss(note.id)}
                  aria-label={`Dismiss: ${note.message}`}
                >
                  Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
