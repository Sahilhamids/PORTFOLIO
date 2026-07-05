import { NextResponse } from 'next/server';

// Revalidate this route every 6 hours
export const revalidate = 21600;

export async function GET() {
  try {
    const username = 'sahilhamid'; // Ensure correct lowercase username

    // Fetch both endpoints concurrently
    const [statsRes, calendarRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { next: { revalidate: 21600 } }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, { next: { revalidate: 21600 } })
    ]);

    const statsData = await statsRes.json();
    const calendarData = await calendarRes.json();

    if (statsData.errors || calendarData.errors) {
      throw new Error("LeetCode API returned an error");
    }

    return NextResponse.json(
      {
        stats: statsData,
        calendar: calendarData,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}
