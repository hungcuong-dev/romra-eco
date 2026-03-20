"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { RiceField, Product } from "@/types";
import { STATUS_LABELS, STATUS_COLORS, STATUS_ICONS } from "@/lib/constants";
import { products } from "@/data/products";
import { riceFields } from "@/data/fields";
import ImpactCounter from "./ImpactCounter";

interface FieldPanelProps {
  selectedField: RiceField | null;
  onFieldSelect: (field: RiceField) => void;
  onProductClick: (product: Product) => void;
  onContactClick: () => void;
  onGalleryClick: () => void;
}

export default function FieldPanel({
  selectedField,
  onFieldSelect,
  onProductClick,
  onContactClick,
  onGalleryClick,
}: FieldPanelProps) {
  return (
    <div className="h-full overflow-y-auto bg-white p-5">
      <AnimatePresence mode="wait">
        {selectedField ? (
          <motion.div
            key={selectedField.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            <button
              onClick={() => onFieldSelect(null as unknown as RiceField)}
              className="mb-4 text-sm text-forest hover:underline"
            >
              &larr; Tất cả cánh đồng
            </button>

            {/* Field name and status */}
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-bold text-forest">{selectedField.name}</h2>
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: STATUS_COLORS[selectedField.status] }}
              >
                {STATUS_ICONS[selectedField.status]} {STATUS_LABELS[selectedField.status]}
              </span>
            </div>

            {/* Info */}
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-forest-dark">Nông dân:</span>{" "}
                {selectedField.farmer}
              </p>
              <p>
                <span className="font-medium text-forest-dark">Địa điểm:</span>{" "}
                {selectedField.district}
              </p>
              <p>
                <span className="font-medium text-forest-dark">Mùa gặt:</span>{" "}
                {selectedField.harvestMonth}
              </p>
              <p>{selectedField.description}</p>
            </div>

            {/* Gallery button */}
            <button
              onClick={onGalleryClick}
              className="mb-4 flex w-full items-center gap-3 rounded-lg border border-forest/20 p-3 text-left transition-colors hover:bg-cream"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/canhDong.jpeg"
                  alt="Ảnh cánh đồng"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-forest-dark">Ảnh cánh đồng</p>
                <p className="text-xs text-gray-400">Nhấn để xem gallery</p>
              </div>
              <svg className="ml-auto shrink-0 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Straw amount bar */}
            <div className="mb-4">
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-forest-dark">Rơm khả dụng</span>
                <span className="font-bold text-forest">{selectedField.straw_kg.toLocaleString()} kg</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-cream">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((selectedField.straw_kg / 3500) * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-forest"
                />
              </div>
            </div>

            {/* Impact Counter */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-forest-dark">Tác động môi trường</h3>
              <ImpactCounter strawKg={selectedField.straw_kg} />
            </div>

            {/* Linked products — show first 2, then "view all" */}
            <div className="mb-4">
              <h3 className="mb-3 text-sm font-bold text-forest-dark">Sản phẩm liên quan</h3>
              <div className="space-y-2">
                {selectedField.linkedProductIds.slice(0, 2).map((pid) => {
                  const product = products.find((p) => p.id === pid);
                  if (!product) return null;
                  return (
                    <button
                      key={pid}
                      onClick={() => onProductClick(product)}
                      className="flex w-full items-center gap-3 rounded-lg bg-cream p-3 text-left transition-colors hover:bg-gold/20"
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                        <Image
                          src={product.image}
                          alt={product.shortTitle}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-forest-dark">
                          {product.shortTitle}
                        </span>
                        <p className="truncate text-xs text-gray-400">Nhấn để xem chi tiết</p>
                      </div>
                    </button>
                  );
                })}
                <a
                  href="/products"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-forest/20 p-3 text-sm font-medium text-forest transition-colors hover:bg-cream"
                >
                  Xem tất cả sản phẩm
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Support CTA */}
            <button
              onClick={onContactClick}
              className="block w-full rounded-full bg-gold py-3 text-center font-semibold text-forest-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Hỗ trợ cánh đồng này
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="mb-2 text-xl font-bold text-forest">Bản đồ cánh đồng</h2>
            <p className="mb-6 text-sm text-gray-600">
              Khám phá các cánh đồng lúa quanh Đà Nẵng và Quảng Nam. Nhấn vào
              marker trên bản đồ hoặc chọn từ danh sách bên dưới.
            </p>

            {/* Field list */}
            <div className="space-y-2">
              {riceFields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => onFieldSelect(field)}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-cream"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                    style={{ backgroundColor: STATUS_COLORS[field.status] + "20", color: STATUS_COLORS[field.status] }}
                  >
                    {STATUS_ICONS[field.status]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-forest-dark">
                      {field.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {field.farmer} &middot; {field.straw_kg.toLocaleString()} kg
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
