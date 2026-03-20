"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/components/auth/AuthProvider";

export default function CheckinBanner() {
  const { user } = useUser();
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [drops, setDrops] = useState(0);

  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const lastCheckin = localStorage.getItem(`checkin_${user.id}`);
    const savedStreak = parseInt(localStorage.getItem(`streak_${user.id}`) || "0");

    if (lastCheckin === today) {
      setCheckedIn(true);
      setStreak(savedStreak);
      setDrops(getDrops(savedStreak));
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (lastCheckin === yesterday) {
        setStreak(savedStreak);
      } else {
        setStreak(0);
        localStorage.setItem(`streak_${user.id}`, "0");
      }
    }
  }, [user]);

  const getMultiplier = (s: number) => {
    if (s >= 30) return 3;
    if (s >= 7) return 2;
    if (s >= 3) return 1.5;
    return 1;
  };

  const getDrops = (s: number) => Math.floor(1 * getMultiplier(s));

  const handleCheckin = () => {
    if (!user || checkedIn) return;
    const today = new Date().toISOString().split("T")[0];
    const newStreak = streak + 1;
    const earned = getDrops(newStreak);
    const currentTotal = parseInt(localStorage.getItem(`totalDrops_${user.id}`) || "0");

    localStorage.setItem(`checkin_${user.id}`, today);
    localStorage.setItem(`streak_${user.id}`, String(newStreak));
    localStorage.setItem(`totalDrops_${user.id}`, String(currentTotal + earned));

    setCheckedIn(true);
    setStreak(newStreak);
    setDrops(earned);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-dark via-forest to-forest-dark p-6 sm:p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white" />
      </div>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Left — icon + streak */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
            {checkedIn ? "✅" : "💧"}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {checkedIn ? "Đã điểm danh!" : "Điểm danh hôm nay"}
            </h3>
            <p className="mt-1 text-sm text-white/50">
              {checkedIn
                ? `Nhận ${drops} giọt nước`
                : "Nhấn để nhận giọt nước miễn phí"}
            </p>
          </div>
        </div>

        {/* Right — streak + button */}
        <div className="flex items-center gap-4 sm:ml-auto">
          {/* Streak */}
          {streak > 0 && (
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-2xl font-black text-gold">{streak}</p>
              <p className="text-[10px] font-medium text-white/40">
                ngày 🔥
                {getMultiplier(streak) > 1 && ` x${getMultiplier(streak)}`}
              </p>
            </div>
          )}

          {/* Button */}
          {!checkedIn && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckin}
              className="rounded-xl bg-gold px-6 py-3 text-base font-bold text-forest-dark shadow-lg transition-shadow hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg"
            >
              Điểm danh
            </motion.button>
          )}
        </div>
      </div>

      {/* Reward animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-6 top-4 rounded-full bg-gold px-5 py-2.5 text-lg font-bold text-forest-dark shadow-xl"
          >
            +{drops} 💧
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
