"use client";

// SWAP POINT: replace this CSS gemstone placeholder with a GLB render via
//             @react-three/fiber or a PNG sprite sequence when the real
//             product asset lands. Keep the same prop API so beats that
//             consume <LollipopRender /> don't need to change.

type LollipopColor = "charge" | "zen" | "dream";

type LollipopRenderProps = {
  color?: LollipopColor;
  size?: number;
  glow?: boolean;
  className?: string;
};

const PALETTE: Record<
  LollipopColor,
  { base: string; highlight: string; glow: string }
> = {
  charge: {
    base: "#f5d547",
    highlight: "#fffbe0",
    glow: "rgba(245, 213, 71, 0.55)",
  },
  zen: {
    base: "#c9b8d9",
    highlight: "#f3edf8",
    glow: "rgba(201, 184, 217, 0.55)",
  },
  dream: {
    base: "#2a2c5f",
    highlight: "#6b6ec7",
    glow: "rgba(106, 110, 199, 0.7)",
  },
};

export function LollipopRender({
  color = "charge",
  size = 260,
  glow = false,
  className,
}: LollipopRenderProps) {
  const p = PALETTE[color];

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 1.55,
        position: "relative",
        display: "inline-block",
      }}
      aria-hidden="true"
    >
      {/* Candy head */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: size,
          height: size,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle at 32% 28%, ${p.highlight} 0%, ${p.base} 42%, ${p.base} 70%, rgba(0,0,0,0.35) 100%)`,
          boxShadow: `inset -8px -12px 24px rgba(0,0,0,0.25), inset 12px 16px 28px rgba(255,255,255,0.35)${
            glow ? `, 0 0 60px 10px ${p.glow}` : ""
          }`,
          animation: "lixx-lollipop-rotate 14s linear infinite",
          willChange: "transform",
        }}
      />
      {/* Stick */}
      <div
        style={{
          position: "absolute",
          top: size * 0.95,
          left: "50%",
          width: size * 0.06,
          height: size * 0.55,
          transform: "translateX(-50%)",
          borderRadius: size * 0.03,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.05) 100%)",
          backgroundColor: "#e8e3d5",
        }}
      />
      <style jsx>{`
        @keyframes lixx-lollipop-rotate {
          from {
            transform: translateX(-50%) rotate(0deg);
          }
          to {
            transform: translateX(-50%) rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
