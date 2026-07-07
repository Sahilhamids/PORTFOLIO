import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Verify against environment variable (default to "sahil" if not set in local dev)
    const validPassword = process.env.DASHBOARD_PASSWORD || "sahil";

    if (password.toLowerCase() !== validPassword.toLowerCase()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_ACCESS_TOKEN;

    // If no tokens are provided, return mock data
    if (!projectId || !token) {
      return NextResponse.json({
        mockData: true,
        stats: [
          { label: "Total Views", value: "24,592", trend: "+12%" },
          { label: "Unique Visitors", value: "8,941", trend: "+5%" },
          { label: "Avg. Session", value: "2m 14s", trend: "-1%" },
          { label: "Bounce Rate", value: "32%", trend: "-4%" },
        ],
        chartData: [40, 70, 45, 90, 65, 85, 120, 95, 110, 80, 130, 100],
        topSources: [
          { source: "Direct", percent: 45 },
          { source: "LinkedIn", percent: 30 },
          { source: "Twitter / X", percent: 15 },
          { source: "GitHub", percent: 10 },
        ]
      });
    }

    // Example of fetching from Vercel's API
    // (Note: Vercel's REST API for Web Analytics is not publicly documented in a stable v1 yet.
    // The exact endpoint might vary depending on Vercel updates.)
    const res = await fetch(`https://api.vercel.com/v1/projects/${projectId}/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch real data from Vercel' }, { status: 500 });
    }

    const data = await res.json();

    // Map your real Vercel data to the dashboard format here
    // For now we'll just return it, and the client will need to parse it.
    // If the data structure is complex, you can extract it here.

    return NextResponse.json({
      mockData: false,
      data
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
