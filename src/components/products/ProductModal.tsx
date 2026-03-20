"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCheck } from "react-icons/hi";
import type { Product } from "@/types";
import { CONTACT } from "@/lib/constants";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [imageZoom, setImageZoom] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-gray-100"
        >
          <HiX size={20} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 bg-cream md:h-auto">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
            />
            <button
              onClick={() => setImageZoom(true)}
              className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-forest-dark shadow transition-all hover:bg-white hover:scale-110"
              title="Phóng to ảnh"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>

          {/* Fullscreen image zoom */}
          <AnimatePresence>
            {imageZoom && (
              <motion.div
                className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setImageZoom(false)}
              >
                <motion.div
                  className="relative h-[85vh] w-[92vw] max-w-4xl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <button
                  onClick={() => setImageZoom(false)}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Details */}
          <div className="p-6">
            <h2 className="mb-3 text-2xl font-bold text-forest">{product.title}</h2>
            <p className="mb-4 text-gray-600">{product.description}</p>

            {/* Specs */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-cream p-3">
                <p className="text-xs font-medium text-gray-500">Kích thước</p>
                <p className="text-sm font-semibold text-forest-dark">{product.size}</p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <p className="text-xs font-medium text-gray-500">Trọng lượng</p>
                <p className="text-sm font-semibold text-forest-dark">{product.weight}</p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <p className="text-xs font-medium text-gray-500">Màu sắc</p>
                <p className="text-sm font-semibold text-forest-dark">{product.color}</p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <p className="text-xs font-medium text-gray-500">Phân huỷ</p>
                <p className="text-sm font-semibold text-forest-dark">3-6 tháng</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-forest">Đặc điểm nổi bật</h3>
              <ul className="space-y-1.5">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <HiCheck className="mt-0.5 shrink-0 text-forest" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=Đặt hàng: ${product.title}`}
                className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-forest-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Đặt hàng ngay
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=Tư vấn: ${product.title}`}
                className="rounded-full border-2 border-forest px-6 py-2.5 text-sm font-semibold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest/5"
              >
                Tư vấn thêm
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
