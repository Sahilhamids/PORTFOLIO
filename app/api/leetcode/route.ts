import { NextResponse } from 'next/server';

// Revalidate this route every 6 hours
export const revalidate = 0;

export async function GET() {
  try {
    const username = 'sahilhamid'; // Ensure correct lowercase username

    // Fetch both endpoints concurrently
    const [statsRes, calendarRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { cache: 'no-store' }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, { cache: 'no-store' })
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
          'Cache-Control': 'no-store, max-age=0',
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
