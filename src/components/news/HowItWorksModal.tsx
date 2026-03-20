"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: "📋",
    title: "Điểm danh mỗi ngày",
    desc: "Nhận 1 giọt nước miễn phí mỗi ngày. Điểm danh liên tục để nhận thêm bonus!",
    bonus: "3 ngày liên tục: x1.5 · 7 ngày: x2 · 30 ngày: x3",
  },
  {
    icon: "📰",
    title: "Đọc bài viết",
    desc: "Mỗi bài viết bạn đọc hết sẽ nhận được 5 giọt nước. Kiến thức + đóng góp!",
    bonus: "Đọc tối thiểu 60 giây để nhận thưởng",
  },
  {
    icon: "💧",
    title: "Quy đổi giọt nước",
    desc: "Giọt nước được quy đổi thành tiền thật, đóng góp vào chiến dịch gây quỹ cộng đồng.",
    bonus: "1 giọt nước = 100đ ~ 200đ tùy chiến dịch",
  },
  {
    icon: "🌱",
    title: "Tạo tác động thật",
    desc: "Số tiền quy đổi được chuyển trực tiếp đến các chiến dịch: thay thế túi nhựa, hỗ trợ trẻ em...",
    bonus: "Minh bạch · Theo dõi tiến độ trực tiếp",
  },
];

export default function HowItWorksModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-forest-dark via-forest to-forest-dark p-6 pb-8 text-center">
              <button
                onClick={onClose}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <p className="text-3xl">💧</p>
              <h2 className="mt-2 text-xl font-bold text-white">
                Cách nhận giọt nước
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Đọc bài · Điểm danh · Góp quỹ cộng đồng
              </p>
            </div>

            {/* Steps */}
            <div className="p-5 sm:p-6">
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex gap-4 rounded-2xl bg-cream p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                      {step.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-forest-dark">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        {step.desc}
                      </p>
                      <p className="mt-1.5 text-[10px] font-medium text-forest/70">
                        {step.bonus}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-gold/20 to-gold/5 p-4 text-center">
                <p className="text-xs font-semibold text-forest-dark">
                  Bạn càng đọc nhiều, cộng đồng càng được hưởng lợi!
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  100% giọt nước quy đổi vào chiến dịch gây quỹ
                </p>
              </div>

              <button
                onClick={onClose}
                className="mt-4 w-full rounded-xl bg-forest py-3 text-sm font-bold text-white transition-colors hover:bg-forest-dark"
              >
                Bắt đầu tích giọt nước!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
