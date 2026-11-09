import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Social share card (1200×630) used by Facebook, iMessage, WhatsApp, X, LinkedIn, etc.
export const alt = "La Imperial Meat Market & Taqueria — Fresh meat, authentic tacos and pan dulce in Winnemucca, NV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background: "radial-gradient(circle at 25% 40%, #3a2516 0%, #1a110b 55%, #0d0907 100%)",
          color: "#f6eedb",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={340} alt="" style={{ borderRadius: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, color: "#d4a24c", letterSpacing: 4, textTransform: "uppercase" }}>Winnemucca, Nevada</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginTop: 14 }}>La Imperial Meat Market &amp; Taqueria</div>
          <div style={{ fontSize: 32, marginTop: 24, color: "#e8dcc4" }}>Carnicería · Taquería · Panadería · Abarrotes</div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 26, color: "#d4a24c" }}>2 stores · Open 7 days · Order on DoorDash</div>
        </div>
      </div>
    ),
    size,
  );
}
