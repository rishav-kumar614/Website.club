import { ImageResponse } from "next/og";

export const alt = "Website Club — 3D & Interactive Web Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", letterSpacing: 6, fontSize: 26, color: "#9A9A9A" }}>WEBSITE CLUB</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            Websites shouldn&apos;t feel flat.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#5E8BFF" }}>Rent it. Build it. Transform it.</div>
        </div>
      </div>
    ),
    size,
  );
}
