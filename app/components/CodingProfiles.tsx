"use client";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { ActivityCalendar } from "react-activity-calendar";

interface LCStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
}

function WindowFrame({ title, url, color, children }: {
  title: string; url: string; color: string; children: React.ReactNode;
}) {
  return (
    <div className="card-glow rounded-xl overflow-hidden flex flex-col" style={{ background: "var(--surface)" }}>
      {/* title bar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>{title}</span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="text-xs px-2 py-0.5 rounded transition-colors"
          style={{ color, border: `1px solid ${color}44`, background: `${color}11` }}>
          Visit ↗
        </a>
      </div>
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
}

function Bar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: "var(--muted)" }}>{label}</span>
        <span style={{ color }}>{solved}<span style={{ color: "var(--muted)" }}>/{total}</span></span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
        <div className="h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function CodingProfiles() {
  const [lc, setLc] = useState<LCStats | null>(null);
  const [lcActivity, setLcActivity] = useState<{date: string, count: number, level: 0|1|2|3|4}[]>([]);
  const [lcErr, setLcErr] = useState(false);

  useEffect(() => {
    fetch("https://alfa-leetcode-api.onrender.com/sahilhamid/solved")
      .then(r => r.json())
      .then(d => {
        if (d.errors) throw new Error();
        setLc({
          totalSolved: d.solvedProblem,
          totalQuestions: 3500,
          easySolved: d.easySolved,
          totalEasy: 800,
          mediumSolved: d.mediumSolved,
          totalMedium: 1700,
          hardSolved: d.hardSolved,
          totalHard: 700,
          ranking: 1143323,
          acceptanceRate: 55
        });
      })
      .catch(() => setLcErr(true));

    fetch("https://alfa-leetcode-api.onrender.com/sahilhamid/calendar")
      .then(r => r.json())
      .then(d => {
        if (d.submissionCalendar) {
          const cal = JSON.parse(d.submissionCalendar);
          const data = Object.keys(cal).map(ts => {
            const date = new Date(parseInt(ts) * 1000).toISOString().split("T")[0];
            const count = cal[ts];
            let level: 0|1|2|3|4 = 0;
            if (count > 0) level = 1;
            if (count > 2) level = 2;
            if (count > 5) level = 3;
            if (count > 10) level = 4;
            return { date, count, level };
          });
          setLcActivity(data.sort((a,b) => a.date.localeCompare(b.date)));
        }
      })
      .catch(e => console.error("Could not fetch LC calendar:", e));
  }, []);

  // fallback static data from resume if API is down
  const solved    = lc?.totalSolved    ?? 140;
  const total     = lc?.totalQuestions ?? 3400;
  const easy      = lc?.easySolved     ?? 50;
  const totalEasy = lc?.totalEasy      ?? 800;
  const medium    = lc?.mediumSolved   ?? 75;
  const totalMed  = lc?.totalMedium    ?? 1700;
  const hard      = lc?.hardSolved     ?? 15;
  const totalHard = lc?.totalHard      ?? 700;
  const rank      = lc?.ranking;
  const acc       = lc?.acceptanceRate;

  return (
    <section className="py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-3">Problem Solving</p>
          <h2 className="section-title">
            Coding <span style={{ color: "var(--cyan)" }}>Profiles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">

          {/* ── LeetCode ── */}
          <WindowFrame title="leetcode.com/u/sahilhamid" url="https://leetcode.com/u/sahilhamid/" color="#ffa116">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(255,161,22,0.1)", border: "1px solid rgba(255,161,22,0.2)" }}>
                🧩
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-none">{solved}
                  <span className="text-sm font-normal ml-1" style={{ color: "var(--muted)" }}>/ {total}</span>
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>problems solved</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <Bar label="Easy"   solved={easy}   total={totalEasy} color="#00b8a3" />
              <Bar label="Medium" solved={medium} total={totalMed}  color="#ffa116" />
              <Bar label="Hard"   solved={hard}   total={totalHard} color="#ef4743" />
            </div>

            <div className="flex gap-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
              {rank && (
                <div>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Ranking</p>
                  <p className="text-sm font-semibold text-white">#{rank.toLocaleString()}</p>
                </div>
              )}
              {acc && (
                <div>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Acceptance</p>
                  <p className="text-sm font-semibold text-white">{acc.toFixed(1)}%</p>
                </div>
              )}
              {lcErr && (
                <p className="text-xs" style={{ color: "var(--muted)" }}>Live stats unavailable — showing resume data</p>
              )}
            </div>
          </WindowFrame>

          {/* ── HackerRank ── */}
          <WindowFrame title="hackerrank.com/ssahil9635" url="https://www.hackerrank.com/profile/ssahil9635" color="#00ea64">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(0,234,100,0.1)", border: "1px solid rgba(0,234,100,0.2)" }}>
                ⭐
              </div>
              <div>
                <p className="font-bold text-white">HackerRank</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>ssahil9635</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { cert: "Python (Basic)", stars: 5, color: "#00ea64" },
                { cert: "Problem Solving", stars: 4, color: "#00ea64" },
                { cert: "SQL (Basic)", stars: 3, color: "#00ea64" },
              ].map(({ cert, stars, color }) => (
                <div key={cert} className="flex items-center justify-between py-2 px-3 rounded"
                  style={{ background: "rgba(0,234,100,0.04)", border: "1px solid rgba(0,234,100,0.1)" }}>
                  <span className="text-xs text-white">{cert}</span>
                  <span className="text-xs" style={{ color }}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
                </div>
              ))}
            </div>

            <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
              Certified in Python &amp; Problem Solving
            </p>
          </WindowFrame>


        </div>

        {/* ── GitHub Activity ── */}
        <div className="mt-6">
          <WindowFrame title="github.com/Sahilhamids" url="https://github.com/Sahilhamids" color="#ffffff">
            <div className="p-2 md:p-6 overflow-hidden overflow-x-auto flex justify-center w-full">
              <GitHubCalendar 
                username="Sahilhamids" 
                colorScheme="dark"
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
          </WindowFrame>
        </div>

        {/* ── LeetCode Activity ── */}
        <div className="mt-6">
          <WindowFrame title="leetcode.com/u/sahilhamid (Activity)" url="https://leetcode.com/u/sahilhamid/" color="#ffa116">
            <div className="p-2 md:p-6 overflow-hidden overflow-x-auto flex justify-center w-full">
              {lcActivity.length > 0 ? (
                <ActivityCalendar 
                  data={lcActivity} 
                  colorScheme="dark"
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                />
              ) : (
                <p className="text-sm text-[var(--muted)]">Loading Activity...</p>
              )}
            </div>
          </WindowFrame>
        </div>

      </div>
    </section>
  );
}
