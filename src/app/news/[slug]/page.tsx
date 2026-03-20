"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import ReadingTimer from "@/components/news/ReadingTimer";
import DropsBubble from "@/components/news/DropsBubble";
import { articles } from "@/data/campaigns";

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <p className="text-5xl">📄</p>
            <h1 className="mt-4 text-xl font-bold text-forest-dark">
              Không tìm thấy bài viết
            </h1>
            <Link
              href="/news"
              className="mt-4 inline-block rounded-full bg-forest px-6 py-2 text-sm font-medium text-white"
            >
              Quay lại bảng tin
            </Link>
          </div>
        </main>
      </>
    );
  }

  const articleUrl = article.url || "";

  return (
    <>
      <Header />
      <main className="flex h-[calc(100vh-64px)] flex-col bg-cream">
        {/* Top bar — article info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-gray-200 bg-white px-4 py-3"
        >
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <Link
              href="/news"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-forest-dark transition-colors hover:bg-gray-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Bảng tin
            </Link>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-sm font-bold text-forest-dark">
                {article.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{article.read_time_minutes} phút đọc</span>
                <span>·</span>
                <span className="text-gold font-medium">+1💧/phút</span>
              </div>
            </div>

            {articleUrl && (
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-forest/10 px-3 py-1.5 text-xs font-medium text-forest transition-colors hover:bg-forest/20"
              >
                Bài gốc
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>

        {/* Article iframe */}
        {articleUrl ? (
          <div className="flex-1">
            <iframe
              src={articleUrl}
              className="h-full w-full border-0"
              title={article.title}
              sandbox="allow-same-origin allow-scripts allow-popups"
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-400">Nội dung bài viết chưa có</p>
          </div>
        )}
      </main>

      {/* Reading timer */}
      <ReadingTimer />
      <DropsBubble />
    </>
  );
}
