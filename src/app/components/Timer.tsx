
"use client";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-xs text-gray-400">Updated {seconds}s ago</span>;
};

export default Timer;
