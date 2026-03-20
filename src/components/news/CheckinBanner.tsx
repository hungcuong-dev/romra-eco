"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/components/auth/AuthProvider";
import { useDrops } from "@/components/drops/DropsProvider";
import { doCheckin } from "@/lib/drops";

export default function CheckinBanner() {
  const { user } = useUser();
  const { streak, lastCheckin, loaded, addDropsLocal, setStreakLocal } = useDrops();
  const [checkedIn, setCheckedIn] = useState(false);
  const [drops, setDrops] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [checking, setChecking] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!loaded) return;
    if (lastCheckin === today) {
      setCheckedIn(true);
      // Calculate what was earned
      let multiplier = 1;
      if (streak >= 30) multiplier = 3;
      else if (streak >= 7) multiplier = 2;
      else if (streak >= 3) multiplier = 1.5;
      setDrops(Math.floor(1 * multiplier));
    }
  }, [loaded, lastCheckin, streak, today]);

  const getMultiplier = (s: number) => {
    if (s >= 30) return 3;
    if (s >= 7) return 2;
    if (s >= 3) return 1.5;
    return 1;
  };

  const handleCheckin = async () => {
    if (!user || checkedIn || checking) return;
    setChecking(true);

    const result = await doCheckin(user.id);

    if (result.success && !result.alreadyCheckedIn) {
      setCheckedIn(true);
      setDrops(result.drops);
      // Update shared state immediately
      addDropsLocal(result.drops);
      setStreakLocal(result.streak, today);

      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    } else if (result.alreadyCheckedIn) {
      setCheckedIn(true);
    }

    setChecking(false);
  };

  if (!user || !loaded) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-dark via-forest to-forest-dark p-6 sm:p-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white" />
      </div>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
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

        <div className="flex items-center gap-4 sm:ml-auto">
          {streak > 0 && (
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-2xl font-black text-gold">{streak}</p>
              <p className="text-[10px] font-medium text-white/40">
                ngày 🔥
                {getMultiplier(streak) > 1 && ` x${getMultiplier(streak)}`}
              </p>
            </div>
          )}

          {!checkedIn && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckin}
              disabled={checking}
              className="rounded-xl bg-gold px-6 py-3 text-base font-bold text-forest-dark shadow-lg transition-shadow hover:shadow-xl disabled:opacity-60 sm:px-8 sm:py-4 sm:text-lg"
            >
              {checking ? "Đang xử lý..." : "Điểm danh"}
            </motion.button>
          )}
        </div>
      </div>

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
