"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/components/auth/AuthProvider";
import { useDrops } from "@/components/drops/DropsProvider";

export default function DropsBubble() {
  const { user } = useUser();
  const { totalDrops, streak, loaded } = useDrops();
  const [expanded, setExpanded] = useState(false);

  if (!user || !loaded) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-56 rounded-2xl bg-white p-4 shadow-xl"
          >
            <h4 className="mb-3 text-sm font-bold text-forest-dark">Giọt nước của bạn</h4>

            <div className="mb-3 flex items-center gap-3 rounded-xl bg-cream p-3">
              <span className="text-2xl">💧</span>
              <div>
                <p className="text-2xl font-black text-forest-dark">{totalDrops}</p>
                <p className="text-[10px] text-gray-400">tổng giọt nước</p>
              </div>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-2 rounded-xl bg-orange-50 p-3">
                <span className="text-lg">🔥</span>
                <div>
                  <p className="text-sm font-bold text-orange-600">{streak} ngày liên tiếp</p>
                  <p className="text-[10px] text-orange-400">
                    {streak >= 30 ? "x3" : streak >= 7 ? "x2" : streak >= 3 ? "x1.5" : "x1"} thưởng
                  </p>
                </div>
              </div>
            )}

            <div className="mt-3 text-center text-[10px] text-gray-400">
              Giọt nước = đóng góp gây quỹ cộng đồng
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setExpanded(!expanded)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-dark shadow-xl transition-shadow hover:shadow-2xl"
      >
        <div className="relative">
          <span className="text-2xl">💧</span>
          {totalDrops > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest-dark">
              {totalDrops}
            </span>
          )}
        </div>
      </motion.button>
    </div>
  );
}
