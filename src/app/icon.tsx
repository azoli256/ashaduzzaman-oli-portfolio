import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#22C5EA,#518BFF)", color: "#04202a", fontSize: 30, fontWeight: 800, borderRadius: 16 }}>
        AO
      </div>
    ),
    size,
  );
}
