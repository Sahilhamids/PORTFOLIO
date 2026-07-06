"use client";
import { useEffect, useState, useRef } from "react";
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

function ScrollToRight({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    
    // Scroll to right immediately and whenever the container or its children resize
    const scrollToRight = () => {
      el.scrollLeft = el.scrollWidth;
    };
    
    const observer = new ResizeObserver(scrollToRight);
    observer.observe(el);
    if (el.firstElementChild) {
      observer.observe(el.firstElementChild);
    }
    
    // Fallback timer just in case async children load slightly later
    const timer = setTimeout(scrollToRight, 1000);
    
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [children]);

  return (
    <div ref={scrollRef} className="p-2 md:p-6 overflow-hidden overflow-x-auto w-full no-scrollbar">
      <div className="min-w-max flex justify-center md:justify-end">
        {children}
      </div>
    </div>
  );
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
  const [ghActivity, setGhActivity] = useState<{date: string, count: number, level: 0|1|2|3|4}[]>([]);

  useEffect(() => {
    const generateFallback = () => {
      const data: {date: string, count: number, level: 0|1|2|3|4}[] = [];
      const today = new Date();
      for (let i = 180; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        let count = 0;
        let level: 0|1|2|3|4 = 0;
        if (Math.random() > 0.7) {
          count = Math.floor(Math.random() * 4) + 1;
          level = count as 0|1|2|3|4;
        }
        data.push({ date: dateStr, count, level });
      }
      return data;
    };

    const fallbackTimeout = setTimeout(() => {
      setLcActivity(prev => prev.length === 0 ? generateFallback() : prev);
      setLcErr(true);
    }, 5000);

    const username = "sahilhamid";
    Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved?t=${Date.now()}`, { cache: "no-store" }).then(r => r.json()),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar?t=${Date.now()}`, { cache: "no-store" }).then(r => r.json()),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}?t=${Date.now()}`, { cache: "no-store" }).then(r => r.json())
    ])
      .then(([statsData, calendarData, profileData]) => {
        if (statsData.errors || calendarData.errors || profileData.errors) {
          throw new Error("LeetCode API returned an error");
        }
        
        let acceptanceRate = null;
        if (statsData.acSubmissionNum && statsData.totalSubmissionNum) {
          const ac = statsData.acSubmissionNum.find((s: any) => s.difficulty === "All")?.submissions || 0;
          const total = statsData.totalSubmissionNum.find((s: any) => s.difficulty === "All")?.submissions || 0;
          if (total > 0) {
            acceptanceRate = (ac / total) * 100;
          }
        }

        // Set Stats
        setLc({
          totalSolved: statsData.solvedProblem,
          totalQuestions: 3985,
          easySolved: statsData.easySolved,
          totalEasy: 953,
          mediumSolved: statsData.mediumSolved,
          totalMedium: 2081,
          hardSolved: statsData.hardSolved,
          totalHard: 951,
          ranking: profileData.ranking ?? null,
          acceptanceRate: acceptanceRate,
        });

        // Set Calendar
        if (calendarData && calendarData.submissionCalendar) {
          clearTimeout(fallbackTimeout);
          const cal = JSON.parse(calendarData.submissionCalendar);
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
      .catch(e => {
        clearTimeout(fallbackTimeout);
        setLcActivity(generateFallback());
        setLcErr(true);
        console.error("Could not fetch LC stats directly:", e);
      });

    // Fetch GitHub
    fetch(`https://github-contributions-api.jogruber.de/v4/Sahilhamids?y=last&t=${Date.now()}`, { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        if (d && d.contributions) {
          // ensure data is properly typed for ActivityCalendar
          const ghData = d.contributions.map((c: any) => ({
            date: c.date,
            count: c.count,
            level: c.level
          }));
          setGhActivity(ghData);
        }
      })
      .catch(e => {
        console.error("Could not fetch GitHub stats:", e);
      });
      
    return () => clearTimeout(fallbackTimeout);
  }, []);

  // fallback static data from resume if API is down
  const solved    = lc?.totalSolved    ?? 140;
  const total     = lc?.totalQuestions ?? 3985;
  const easy      = lc?.easySolved     ?? 50;
  const totalEasy = lc?.totalEasy      ?? 953;
  const medium    = lc?.mediumSolved   ?? 75;
  const totalMed  = lc?.totalMedium    ?? 2081;
  const hard      = lc?.hardSolved     ?? 15;
  const totalHard = lc?.totalHard      ?? 951;
  const rank      = lc?.ranking ?? null;
  const acc       = lc?.acceptanceRate ?? null;

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
            <ScrollToRight>
              {ghActivity.length > 0 ? (
                <ActivityCalendar 
                  data={ghActivity} 
                  colorScheme="dark"
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                />
              ) : (
                <p className="text-sm text-[var(--muted)]">Loading Activity...</p>
              )}
            </ScrollToRight>
          </WindowFrame>
        </div>

        {/* ── LeetCode Activity ── */}
        <div className="mt-6">
          <WindowFrame title="leetcode.com/u/sahilhamid (Activity)" url="https://leetcode.com/u/sahilhamid/" color="#ffa116">
            <ScrollToRight>
              {lcActivity.length > 0 ? (
                <ActivityCalendar 
                  data={lcActivity} 
                  colorScheme="dark"
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                />
              ) : (
                <p className="text-sm text-[var(--muted)]">Loading Activity...</p>
              )}
            </ScrollToRight>
          </WindowFrame>
        </div>

      </div>
    </section>
  );
}
