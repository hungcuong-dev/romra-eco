"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useUser } from "@/components/auth/AuthProvider";

export default function NewsPage() {
  const { user, loading } = useUser();
  const [dismissedWarning, setDismissedWarning] = useState(false);

  const showWarning = !loading && !user && !dismissedWarning;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-gradient-to-r from-forest to-forest-dark px-4 py-16 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Bảng tin</h1>
          <p className="mx-auto max-w-xl text-white/80">
            Chiến dịch gây quỹ & tin tức từ Rơm Rả Eco
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="rounded-2xl bg-white p-12 shadow-sm">
            <p className="text-5xl">🚧</p>
            <h2 className="mt-4 text-xl font-bold text-forest-dark">Đang phát triển</h2>
            <p className="mt-2 text-gray-500">
              Trang bảng tin và chiến dịch gây quỹ sẽ sớm ra mắt!
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Login warning popup */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-lg"
          >
            <div className="flex items-center gap-4 rounded-2xl bg-forest-dark p-5 shadow-2xl">
              <span className="text-3xl">💧</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  Đăng nhập để tích giọt nước!
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  Điểm danh mỗi ngày và đọc bài để góp quỹ cộng đồng
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
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/30 hover:bg-white/10 hover:text-white/60"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
