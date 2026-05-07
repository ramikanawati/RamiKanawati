import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0c14 0%, #05060a 100%)",
          borderRadius: 40,
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 30%, rgba(0,212,255,0.35), transparent 60%)",
            borderRadius: 40
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 4,
            border: "2px solid rgba(0,212,255,0.45)",
            borderRadius: 38
          }}
        />
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="m" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#67e8ff" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path
            d="M14 14 H50 a18 18 0 0 1 0 36 H30 l24 42"
            fill="none"
            stroke="url(#m)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M106 14 L74 48 L106 92"
            fill="none"
            stroke="url(#m)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M74 48 L100 48"
            fill="none"
            stroke="url(#m)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 12,
            height: 12,
            borderRadius: 12,
            background: "#10b981",
            boxShadow: "0 0 16px 4px rgba(16,185,129,0.6)"
          }}
        />
      </div>
    ),
    { ...size }
  );
}
