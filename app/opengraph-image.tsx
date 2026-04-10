import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Lixx — Not a gummy. Not a pill. A ritual.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic Open Graph image, generated at build time via next/og.
 * No custom font fetch — keeps the build network-proof and the cold
 * start cheap. System serif fallback for the wordmark is close enough
 * to Fraunces for a share card at this scale.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          color: "#f4f1ea",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Charge radial glow in the background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(245,213,71,0.14) 0%, rgba(10,10,12,0) 70%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: 280,
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            zIndex: 1,
          }}
        >
          lixx
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 42,
            fontFamily: "sans-serif",
            color: "#6b6b73",
            marginTop: 48,
            letterSpacing: "-0.01em",
            zIndex: 1,
          }}
        >
          Not a gummy. Not a pill. A ritual.
        </div>

        {/* Charge dot */}
        <div
          style={{
            marginTop: 72,
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "#f5d547",
            boxShadow: "0 0 40px 10px rgba(245,213,71,0.35)",
            zIndex: 1,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
