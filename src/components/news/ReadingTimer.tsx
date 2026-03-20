"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/components/auth/AuthProvider";
import Link from "next/link";

const DROP_PER_MINUTE = 1; // 1 giọt mỗi phút
const MAX_DROPS_PER_DAY = 5; // tối đa 5 giọt/ngày

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getStoredReading(userId: string) {
  const key = `reading_${userId}`;
  const raw = localStorage.getItem(key);
  if (!raw) return { date: getToday(), seconds: 0, dropsEarned: 0 };

  const data = JSON.parse(raw);
  if (data.date !== getToday()) {
    return { date: getToday(), seconds: 0, dropsEarned: 0 };
  }
  return data;
}

function saveReading(userId: string, seconds: number, dropsEarned: number) {
  const key = `reading_${userId}`;
  localStorage.setItem(key, JSON.stringify({ date: getToday(), seconds, dropsEarned }));
}

export default function ReadingTimer() {
  const { user } = useUser();
  const [seconds, setSeconds] = useState(0);
  const [dropsEarned, setDropsEarned] = useState(0);
  const [active, setActive] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [lastRewardDrop, setLastRewardDrop] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);
  const dropsRef = useRef(0);

  const isFull = dropsEarned >= MAX_DROPS_PER_DAY;

  // Load từ localStorage
  useEffect(() => {
    if (!user) return;
    const stored = getStoredReading(user.id);
    setSeconds(stored.seconds);
    setDropsEarned(stored.dropsEarned || 0);
    secondsRef.current = stored.seconds;
    dropsRef.current = stored.dropsEarned || 0;
    setLoaded(true);
  }, [user]);

  // Pause khi tab ẩn
  useEffect(() => {
    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const persist = useCallback(() => {
    if (user) saveReading(user.id, secondsRef.current, dropsRef.current);
  }, [user]);

  // Timer — mỗi 60 giây cộng 1 giọt, dừng khi full
  useEffect(() => {
    if (!user || !loaded || isFull || !active) return;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        secondsRef.current = next;

        // Lưu mỗi 5 giây
        if (next % 5 === 0) persist();

        // Mỗi 60 giây = 1 giọt
        const newDrops = Math.min(Math.floor(next / 60), MAX_DROPS_PER_DAY);
        if (newDrops > dropsRef.current) {
          const earned = newDrops - dropsRef.current;
          dropsRef.current = newDrops;
          setDropsEarned(newDrops);
          setLastRewardDrop(newDrops);
          setShowReward(true);
          setTimeout(() => setShowReward(false), 2500);

          // Cộng drops vào tổng
          const currentTotal = parseInt(localStorage.getItem(`totalDrops_${user.id}`) || "0");
          localStorage.setItem(`totalDrops_${user.id}`, String(currentTotal + earned));

          saveReading(user.id, next, newDrops);

          // Dừng nếu full
          if (newDrops >= MAX_DROPS_PER_DAY) {
            setSeconds(next);
          }
        }

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, user, loaded, isFull, persist]);

  // Lưu khi rời trang
  useEffect(() => {
    if (!user) return;
    const handleUnload = () => persist();
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      persist();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user, persist]);

  const progress = Math.min((dropsEarned / MAX_DROPS_PER_DAY) * 100, 100);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const secsToNextDrop = dropsEarned < MAX_DROPS_PER_DAY ? 60 - (seconds % 60) : 0;

  // Chưa đăng nhập
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

  if (!loaded) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-full bg-forest-dark/95 shadow-xl backdrop-blur">
        {/* Progress background */}
        <div
          className="absolute inset-0 bg-forest/50 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center gap-3 px-5 py-3">
          {/* Timer */}
          <div className="flex items-center gap-2">
            <span className="text-lg">{isFull ? "✅" : "🔥"}</span>
            <span className="font-mono text-sm font-medium text-white">
              {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>

          {/* Status */}
          <div className="flex-1 text-center">
            <p className="text-xs text-white/60">
              {isFull
                ? "Hôm nay đã nhận đủ giọt nước!"
                : `Còn ${secsToNextDrop}s nữa nhận giọt tiếp theo`}
            </p>
          </div>

          {/* Drop count */}
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
            <span className="text-xs font-bold text-gold">
              {dropsEarned}/{MAX_DROPS_PER_DAY}
            </span>
            <span className="text-xs">💧</span>
          </div>
        </div>
      </div>

      {/* +1 drop popup */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            key={lastRewardDrop}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -80 }}
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-2xl bg-gold px-6 py-3 text-center shadow-xl"
          >
            <p className="text-lg font-bold text-forest-dark">+1 💧</p>
            <p className="text-xs text-forest-dark/70">
              {lastRewardDrop >= MAX_DROPS_PER_DAY ? "Đã nhận đủ hôm nay!" : `${lastRewardDrop}/${MAX_DROPS_PER_DAY} giọt`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
