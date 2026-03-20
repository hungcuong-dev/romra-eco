"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/constants";

export default function DonateModal({
  campaignTitle,
  open,
  onClose,
}: {
  campaignTitle: string;
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

  const channels = [
    {
      icon: "📧",
      label: "Email",
      desc: CONTACT.email,
      href: `mailto:${CONTACT.email}?subject=Đóng góp chiến dịch: ${campaignTitle}&body=Xin chào Rơm Rả Eco,%0A%0ATôi muốn đóng góp cho chiến dịch "${campaignTitle}".%0A%0AXin hãy liên hệ lại với tôi.%0A%0AXin cảm ơn!`,
      color: "bg-red-50 text-red-600",
    },
    {
      icon: "📞",
      label: `Gọi điện (${CONTACT.phoneName})`,
      desc: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
      color: "bg-green-50 text-green-600",
    },
    {
      icon: "💬",
      label: "Nhắn tin Zalo",
      desc: CONTACT.phone,
      href: `https://zalo.me/${CONTACT.phone}`,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: "📘",
      label: "Facebook",
      desc: "Rơm Rả Eco",
      href: CONTACT.facebook,
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-forest-dark via-forest to-forest-dark p-6 text-center">
              <button
                onClick={onClose}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <p className="text-3xl">🤝</p>
              <h2 className="mt-2 text-lg font-bold text-white">
                Đóng góp chiến dịch
              </h2>
              <p className="mt-1 text-sm text-white/60">
                {campaignTitle}
              </p>
            </div>

            {/* Info */}
            <div className="px-5 pt-5">
              <div className="rounded-2xl bg-gold/10 p-4 text-center">
                <p className="text-sm font-medium text-forest-dark">
                  Liên hệ trực tiếp để đóng góp vào chiến dịch
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Mọi đóng góp đều được ghi nhận minh bạch
                </p>
              </div>
            </div>

            {/* Contact channels */}
            <div className="space-y-2 p-5">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-xl bg-cream p-3.5 transition-colors hover:bg-gray-100"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${ch.color}`}>
                    {ch.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-forest-dark">
                      {ch.label}
                    </p>
                    <p className="text-xs text-gray-400">{ch.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-300">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
