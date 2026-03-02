import React from "react";

const isDev = process.env.NODE_ENV !== "production";

const DevBanner = () => {
  if (!isDev) return null;
  return (
    <div className="dev-banner" role="status" aria-live="polite">
      <strong>Dev:</strong> Changed a remote? Do a <kbd>Ctrl+Shift+R</kbd> (or <kbd>Cmd+Shift+R</kbd> on Mac) on this page to load the latest.
    </div>
  );
};

export default DevBanner;
