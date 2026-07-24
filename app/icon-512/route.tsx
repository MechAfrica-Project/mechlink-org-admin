import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Force Node.js runtime to read the local logo file easily.
export const runtime = "nodejs";

export async function GET() {
  const markBase64 = readFileSync(join(process.cwd(), "public/mechlink-mark-dark.png")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#081410", // --void in dark mode
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            background: "radial-gradient(circle, rgba(47,203,143,0.28) 0%, rgba(8,20,16,0) 65%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${markBase64}`}
          width={260}
          height={186}
          alt="MechLink"
          style={{ position: "relative" }}
        />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
