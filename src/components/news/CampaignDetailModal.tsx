"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Campaign } from "@/types";
import { articles } from "@/data/campaigns";

export default function CampaignDetailModal({
  campaign,
  onClose,
}: {
  campaign: Campaign | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!campaign) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [campaign, onClose]);

  const formatVND = (n: number) =>
    new Intl.NumberFormat("vi-VN").format(n) + "đ";

  if (!campaign) return null;

  const progress = Math.min(
    (campaign.current_amount / campaign.target_amount) * 100,
    100
  );
  const relatedArticles = articles.filter(
    (a) => a.campaign_id === campaign.id
  );

  return (
    <AnimatePresence>
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
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl"
        >
          {/* Cover image */}
          <div className="relative h-48 sm:h-56">
            <Image
              src={campaign.cover_image}
              alt={campaign.title}
              fill
              className="rounded-t-3xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
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

            {/* Status badge */}
            <div className="absolute bottom-4 left-5">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-forest-dark">
                {campaign.status === "active" ? "Đang gây quỹ" : "Hoàn thành"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            <h2 className="mb-2 text-xl font-bold text-forest-dark sm:text-2xl">
              {campaign.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              {campaign.description}
            </p>

            {/* Progress section */}
            <div className="mb-5 rounded-2xl bg-cream p-4">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-400">Đã quyên góp</p>
                  <p className="text-xl font-bold text-forest">
                    {formatVND(campaign.current_amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Mục tiêu</p>
                  <p className="text-sm font-semibold text-gray-600">
                    {formatVND(campaign.target_amount)}
                  </p>
                </div>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-forest to-sage"
                />
              </div>
              <p className="mt-2 text-center text-xs font-medium text-forest">
                {progress.toFixed(0)}% mục tiêu
              </p>
            </div>

            {/* Stats */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-cream p-3 text-center">
                <p className="text-lg font-bold text-gold">
                  1💧
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  = {formatVND(campaign.drop_value_vnd)}
                </p>
              </div>
              <div className="rounded-xl bg-cream p-3 text-center">
                <p className="text-lg font-bold text-forest">
                  {relatedArticles.length}
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  bài viết
                </p>
              </div>
              <div className="rounded-xl bg-cream p-3 text-center">
                <p className="text-lg font-bold text-forest-dark">
                  {Math.floor(
                    campaign.current_amount / campaign.drop_value_vnd
                  ).toLocaleString("vi-VN")}
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  giọt nước
                </p>
              </div>
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold text-forest-dark">
                  Bài viết liên quan
                </h3>
                <div className="space-y-2">
                  {relatedArticles.slice(0, 3).map((article) => (
                    <a
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="flex items-center gap-3 rounded-xl bg-cream p-3 transition-colors hover:bg-gray-100"
                    >
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-forest-dark">
                          {article.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-gray-400">
                          {article.read_time_minutes} phút đọc · +5 💧
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
