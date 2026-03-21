"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CampaignBanner from "@/components/news/CampaignBanner";
import CampaignDetailModal from "@/components/news/CampaignDetailModal";
import DonateModal from "@/components/news/DonateModal";
import HowItWorksModal from "@/components/news/HowItWorksModal";
import ArticleCard from "@/components/news/ArticleCard";
import CheckinBanner from "@/components/news/CheckinBanner";
import DropsBubble from "@/components/news/DropsBubble";
import { useUser } from "@/components/auth/AuthProvider";
import { getCampaigns, type CampaignRow } from "@/lib/drops";
import { articles } from "@/data/campaigns";
import type { Campaign } from "@/types";

export default function NewsPage() {
  const { user, loading } = useUser();
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donateCampaign, setDonateCampaign] = useState<Campaign | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Fetch campaigns from DB
  const loadCampaigns = useCallback(async () => {
    const data = await getCampaigns();
    setCampaigns(data);
  }, []);

  useEffect(() => {
    loadCampaigns();
    // Refresh every 30 seconds to see live updates
    const interval = setInterval(loadCampaigns, 30000);
    return () => clearInterval(interval);
  }, [loadCampaigns]);

  const showWarning = !loading && !user && !dismissedWarning;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-forest-dark px-4 py-14 text-center text-white sm:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-gold" />
            <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-gold" />
          </div>
          <div className="relative">
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-2 text-sm font-medium tracking-widest text-gold"
            >
              CỘNG ĐỒNG RƠM RẢ
            </motion.p>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-3 text-4xl font-bold md:text-5xl"
            >
              Bảng tin
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-md text-base text-white/60"
            >
              Đọc bài viết · Tích giọt nước · Góp quỹ cộng đồng
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setShowHowItWorks(true)}
              className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Cách nhận giọt nước
            </motion.button>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
          {/* Daily check-in */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <CheckinBanner />
            </motion.div>
          )}

          {/* Campaigns section */}
          <div className="mb-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-forest-dark sm:text-2xl">
                Chiến dịch gây quỹ
              </h2>
              <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">
                {campaigns.filter((c) => c.status === "active").length} đang diễn ra
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {campaigns
                .filter((c) => c.status === "active")
                .map((campaign) => (
                  <CampaignBanner key={campaign.id} campaign={campaign} onSelect={setSelectedCampaign} />
                ))}
            </div>
          </div>

          {/* Articles section */}
          <div>
            <h2 className="mb-5 text-xl font-bold text-forest-dark sm:text-2xl">
              Bài viết
            </h2>

            {/* Articles grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {articles.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-4xl">📰</p>
                <p className="mt-3 text-gray-400">Chưa có bài viết nào</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Drops bubble — floating */}
      <DropsBubble />

      {/* Login warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="fixed bottom-6 left-4 right-4 z-40 mx-auto max-w-lg"
          >
            <div className="flex items-center gap-4 rounded-2xl bg-forest-dark/95 p-5 shadow-2xl backdrop-blur">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-2xl">
                💧
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">
                  Đăng nhập để tích giọt nước!
                </p>
                <p className="mt-0.5 text-xs text-white/40">
                  Điểm danh & đọc bài để góp quỹ cộng đồng
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href="/auth/login"
                  className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-forest-dark"
                >
                  Đăng nhập
                </Link>
                <button
                  onClick={() => setDismissedWarning(true)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/20 hover:bg-white/10 hover:text-white/50"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaign detail modal */}
      <CampaignDetailModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onDonate={(c) => {
          setSelectedCampaign(null);
          setDonateCampaign(c);
        }}
      />

      {/* Donate modal */}
      <DonateModal
        campaignTitle={donateCampaign?.title || ""}
        open={!!donateCampaign}
        onClose={() => setDonateCampaign(null)}
      />

      {/* How it works modal */}
      <HowItWorksModal
        open={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </>
  );
}
