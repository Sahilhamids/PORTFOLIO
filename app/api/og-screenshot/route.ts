import { NextResponse } from "next/server";

const SITE_URL = "https://sahilhamids-portfolio.vercel.app";

export async function GET() {
  const screenshotUrl =
    `https://api.microlink.io/?url=${encodeURIComponent(SITE_URL)}` +
    `&screenshot=true&meta=false&embed=screenshot.url&waitFor=3500` +
    `&viewport.width=1280&viewport.height=900&screenshot.type=png`;

  return NextResponse.redirect(screenshotUrl, { status: 302 });
}
