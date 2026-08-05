import { ImageResponse } from "next/og";

export const alt = "Evan Jo — Student, writer, and builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f6f1e8",
        color: "#282522",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          borderLeft: "18px solid #5c2633",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "52px",
        }}
      >
        <div style={{ color: "#8a6b27", fontSize: 30, letterSpacing: 6 }}>
          WRITING · LEARNING · BUILDING
        </div>
        <div style={{ fontFamily: "Georgia", fontSize: 112, marginTop: 22 }}>Evan Jo</div>
        <div style={{ fontSize: 36, marginTop: 18 }}>Ideas worked through with purpose.</div>
      </div>
    </div>,
    size,
  );
}
