"use client";

/**
 * Last resort — only fires when the root layout itself fails, so the normal
 * header, footer and fonts aren't available. It has to render its own <html>
 * and <body>, and the styling is inline for the same reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffafc",
          color: "#3d2430",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <h1 style={{ color: "#821d41", fontSize: "1.75rem", margin: 0 }}>
            Nhuga Makeup Studio
          </h1>
          <p style={{ marginTop: "1rem", lineHeight: 1.6, color: "#6b5560" }}>
            The site hit an unexpected problem. Please try again in a moment —
            or reach us on WhatsApp at +977 9862413094.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              cursor: "pointer",
              borderRadius: "999px",
              border: "none",
              background: "#bd1f56",
              color: "white",
              padding: "0.75rem 1.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: "#a08a93" }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
