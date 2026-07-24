import { NextResponse } from "next/server";
import type { MetadataRoute } from "next";

export function GET() {
  const manifest: MetadataRoute.Manifest = {
    name: "MechLink Admin",
    short_name: "MechLink Admin",
    description: "Manage MechLink's team, inbox, and site settings.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // The admin panel renders in the light theme by default (--void is #FFFFFF
    // and there is no theme toggle in the admin UI), so the splash screen must
    // be white too — a dark splash would flash before the white app paints.
    background_color: "#FFFFFF",
    theme_color: "#0E5C43",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      // Full-bleed opaque background with the mark well inside the safe zone,
      // so the same image also works masked (avoids Android's letterbox circle).
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };

  return NextResponse.json(manifest, {
    headers: { "Content-Type": "application/manifest+json" },
  });
}
