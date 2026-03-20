"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Campaign } from "@/types";

export default function CampaignBanner({
  campaign,
  onSelect,
}: {
  campaign: Campaign;
  onSelect?: (campaign: Campaign) => void;
}) {
  const progress = Math.min((campaign.current_amount / campaign.target_amount) * 100, 100);

  const formatVND = (n: number) =>
    new Intl.NumberFormat("vi-VN").format(n) + "đ";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onSelect?.(campaign)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Background */}
      <div className="relative h-64 sm:h-72">
        <Image
          src={campaign.cover_image}
          alt={campaign.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-forest-dark">
            Đang gây quỹ
          </span>
          <span className="text-xs font-medium text-white/90">
            1💧 = {formatVND(campaign.drop_value_vnd)}
          </span>
        </div>

        <h2 className="mb-2 text-xl font-bold text-white drop-shadow-md sm:text-2xl">
          {campaign.title}
        </h2>
        <p className="mb-4 line-clamp-2 max-w-lg text-sm font-medium text-white/85">
          {campaign.description}
        </p>

        {/* Progress */}
        <div className="max-w-md">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-lg font-bold text-gold drop-shadow-sm">
              {formatVND(campaign.current_amount)}
            </span>
            <span className="text-sm font-medium text-white/70">
              / {formatVND(campaign.target_amount)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-gold to-yellow-300"
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-white/60">
            <span>{progress.toFixed(0)}% mục tiêu</span>
            <span className="flex items-center gap-1 text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
              Xem chi tiết →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
