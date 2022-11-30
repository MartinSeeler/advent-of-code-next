import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const font = fetch(new URL("../../public/VT323.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function handler(req: NextRequest) {
  try {
    const fontData = await font;
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const title = searchParams.get("title")?.slice(0, 200);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#27272a",
            color: "#4ade80",
            fontFamily: "VT323",
            fontSize: 64,
            fontWeight: 800,
          }}
        >
          <div>Advent of Code 2022</div>
          {title && <div>{title}</div>}
          <div style={{ marginTop: 40, display: "flex" }}>
            Solution{title ? "" : "s"} by Martin Seeler
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "VT323",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
