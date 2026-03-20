"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/components/auth/AuthProvider";
import Link from "next/link";

const READING_GOAL_SECONDS = 300; // 5 minutes
const DROP_REWARD = 5;

export default function ReadingTimer() {
  const { user } = useUser();
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);
  const [rewarded, setRewarded] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      setActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Timer
  useEffect(() => {
    if (!user || rewarded) return;

    if (active) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          if (next >= READING_GOAL_SECONDS && !rewarded) {
            setRewarded(true);
            setShowReward(true);
            setTimeout(() => setShowReward(false), 4000);
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, user, rewarded]);

  const progress = Math.min((seconds / READING_GOAL_SECONDS) * 100, 100);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // Not logged in
  if (!user) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md">
        <div className="flex items-center gap-3 rounded-full bg-forest-dark/95 px-5 py-3 shadow-xl backdrop-blur">
          <span className="text-lg">💧</span>
          <p className="flex-1 text-xs text-white/60">
            Đăng nhập để nhận giọt nước khi đọc bài
          </p>
          <Link
            href="/auth/login"
            className="rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-forest-dark"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-full bg-forest-dark/95 shadow-xl backdrop-blur">
        {/* Progress background */}
        <div
          className="absolute inset-0 bg-forest/50 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center gap-3 px-5 py-3">
          {/* Timer */}
          <div className="flex items-center gap-2">
            <span className="text-lg">{rewarded ? "✅" : "💧"}</span>
            <span className="font-mono text-sm font-medium text-white">
              {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>

          {/* Status */}
          <div className="flex-1 text-center">
            <p className="text-xs text-white/60">
              {rewarded
                ? `Đã nhận ${DROP_REWARD} giọt nước!`
                : `Đọc ${Math.ceil((READING_GOAL_SECONDS - seconds) / 60)} phút nữa để nhận ${DROP_REWARD} giọt`}
            </p>
          </div>

          {/* Drop count */}
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
            <span className="text-xs text-gold font-bold">
              {rewarded ? DROP_REWARD : 0}/{DROP_REWARD}
            </span>
            <span className="text-xs">💧</span>
          </div>
        </div>
      </div>

      {/* Reward popup */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -80 }}
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-2xl bg-gold px-6 py-3 text-center shadow-xl"
          >
            <p className="text-lg font-bold text-forest-dark">+{DROP_REWARD} 💧</p>
            <p className="text-xs text-forest-dark/70">Cảm ơn bạn đã đọc!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
