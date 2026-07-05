"use client";
import { useState, useEffect } from "react";

export default function LiveLeetcodeCount({ fallback = "140" }: { fallback?: string }) {
  const [count, setCount] = useState(fallback);

  useEffect(() => {
    fetch("https://alfa-leetcode-api.onrender.com/sahilhamid/solved")
      .then(res => res.json())
      .then(data => {
        if (data.solvedProblem) {
          setCount(data.solvedProblem.toString());
        }
      })
      .catch(() => {});
  }, []);

  return <>{count}</>;
}
