import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const username = 'sahilhamid'; // Ensure correct lowercase username

    // Fetch all endpoints concurrently
    const [statsRes, calendarRes, profileRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { cache: 'no-store' }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, { cache: 'no-store' }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`, { cache: 'no-store' })
    ]);

    const statsData = await statsRes.json();
    const calendarData = await calendarRes.json();
    const profileData = await profileRes.json();

    if (statsData.errors || calendarData.errors || profileData.errors) {
      throw new Error("LeetCode API returned an error");
    }

    // calculate acceptance rate
    let acceptanceRate = null;
    if (statsData.acSubmissionNum && statsData.totalSubmissionNum) {
      const ac = statsData.acSubmissionNum.find((s: any) => s.difficulty === "All")?.submissions || 0;
      const total = statsData.totalSubmissionNum.find((s: any) => s.difficulty === "All")?.submissions || 0;
      if (total > 0) {
        acceptanceRate = (ac / total) * 100;
      }
    }

    return NextResponse.json(
      {
        stats: {
          ...statsData,
          ranking: profileData.ranking,
          acceptanceRate,
        },
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
