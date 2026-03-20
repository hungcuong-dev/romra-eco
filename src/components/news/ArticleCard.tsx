"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Article } from "@/types";

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const href = `/news/${article.slug}`;
  const source = article.url ? getDomain(article.url) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <a
        href={href}
        className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden sm:h-48">
          {/* Use img tag for external images to avoid next.config issues */}
          <img
            src={article.cover_image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {article.read_time_minutes} phút
            </span>
            {source && (
              <span className="rounded-full bg-forest/80 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                {source}
              </span>
            )}
          </div>

          {/* Drop reward */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold text-forest-dark">
            +1💧/phút
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-forest-dark transition-colors group-hover:text-forest sm:text-base">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
            {article.excerpt}
          </p>

          <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 sm:text-xs">
            <span>{new Date(article.created_at).toLocaleDateString("vi-VN")}</span>
            {source && (
              <span className="text-forest/60">
                Nguồn: {source}
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
