import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "radial-gradient(circle at 80% 20%, #16385a 0%, #080E1A 60%)", color: "#F2F6FC" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#22C5EA,#518BFF)", color: "#04202a", fontSize: 30, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>AO</div>
          <div style={{ fontSize: 28, color: "#A6B5C9" }}>{profile.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{profile.heroHeadline}</div>
          <div style={{ fontSize: 30, color: "#22C5EA" }}>{profile.title}</div>
        </div>
      </div>
    ),
    size,
  );
}
