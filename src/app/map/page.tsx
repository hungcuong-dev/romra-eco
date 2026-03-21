"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import MapFilters from "@/components/map/MapFilters";
import FieldPanel from "@/components/map/FieldPanel";
import type { RiceField, FieldStatus, Product } from "@/types";
import { CDN } from "@/lib/constants";
import { riceFields } from "@/data/fields";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-cream">
      <div className="text-center">
        <div className="mb-2 text-4xl">🗺️</div>
        <p className="text-sm text-gray-500">Đang tải bản đồ...</p>
      </div>
    </div>
  ),
});

/* ── Contact Popup ── */
function ContactPopup({
  fieldName,
  onClose,
}: {
  fieldName: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 w-full max-w-2xl rounded-2xl bg-forest-dark p-10 shadow-2xl"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
        >
          ✕
        </button>

        {sent ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-3xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Đã gửi thành công!</h3>
            <p className="text-sm text-white/60">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-gold px-8 py-2.5 text-sm font-semibold text-forest-dark"
            >
              Đóng
            </button>
          </motion.div>
        ) : (
          <>
            <h3 className="mb-1 text-xl font-bold text-white">
              Hỗ trợ cánh đồng
            </h3>
            <p className="mb-6 text-sm text-white/50">
              Liên hệ để nhận báo giá và tư vấn giải pháp bao bì phù hợp
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Tên công ty"
                required
                className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <textarea
                placeholder={`Nhu cầu hỗ trợ cánh đồng "${fieldName}"...`}
                rows={4}
                className="w-full resize-none rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-gold py-3 text-sm font-bold text-forest-dark transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
              >
                Gửi yêu cầu
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Product Popup ── */
function ProductPopup({
  product,
  onClose,
  onContact,
}: {
  product: Product;
  onClose: () => void;
  onContact: () => void;
}) {
  const [imageZoom, setImageZoom] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
        >
          ✕
        </button>

        {/* Two-column layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left — Image */}
          <div className="relative">
            <div
              className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-cream"
              onClick={() => setImageZoom(true)}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-forest-dark shadow transition-all hover:bg-white hover:scale-110">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col">
            <h3 className="mb-2 text-2xl font-bold text-forest-dark">
              {product.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Specs */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-cream p-3 text-center">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Kích thước
                </p>
                <p className="mt-1 text-sm font-semibold text-forest-dark">
                  {product.size}
                </p>
              </div>
              <div className="rounded-lg bg-cream p-3 text-center">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Trọng lượng
                </p>
                <p className="mt-1 text-sm font-semibold text-forest-dark">
                  {product.weight}
                </p>
              </div>
              <div className="rounded-lg bg-cream p-3 text-center">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Màu sắc
                </p>
                <p className="mt-1 text-sm font-semibold text-forest-dark">
                  {product.color}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-bold text-forest-dark">Đặc điểm</h4>
              <ul className="space-y-1.5">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="mt-0.5 text-xs text-forest">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                onClose();
                onContact();
              }}
              className="mt-auto block w-full rounded-full bg-gold py-3 text-center font-semibold text-forest-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Liên hệ đặt hàng
            </button>
          </div>
        </div>
      </motion.div>

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
    </motion.div>
  );
}

/* ── Gallery Popup ── */
function GalleryPopup({
  fieldName,
  images,
  onClose,
}: {
  fieldName: string;
  images: string[];
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);

  const goPrev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const goNext = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 w-full max-w-4xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{fieldName}</h3>
          <span className="text-sm text-white/50">
            {current + 1} / {images.length}
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={images[current]}
                alt={`${fieldName} - ảnh ${current + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mt-4 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all ${
                i === current ? "border-gold" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ── */
export default function MapPage() {
  const [selectedField, setSelectedField] = useState<RiceField | null>(null);
  const [activeFilters, setActiveFilters] = useState<FieldStatus[]>([
    "collected",
    "available",
    "burn_risk",
  ]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelExpanded, setPanelExpanded] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const handleToggleFilter = useCallback((status: FieldStatus) => {
    setActiveFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }, []);

  const handleFieldSelect = useCallback((field: RiceField | null) => {
    setSelectedField(field);
    if (field) {
      setPanelOpen(true);
      setPanelExpanded(false); // show peek first on mobile
    } else {
      setPanelExpanded(false);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row">
        {/* Map area */}
        <div className="relative flex-1">
          {/* Filters overlay */}
          <div className="absolute left-4 top-4 z-10">
            <MapFilters activeFilters={activeFilters} onToggle={handleToggleFilter} />
          </div>

          {/* Mobile: show field name chip when panel is closed and field selected */}
          {!panelOpen && selectedField && (
            <button
              onClick={() => { setPanelOpen(true); setPanelExpanded(false); }}
              className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest-dark shadow-xl md:hidden"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedField.status === "collected" ? "#4a6b3a" : selectedField.status === "available" ? "#e8c07d" : "#c0392b" }} />
              {selectedField.name}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
          )}
          {/* Mobile: field chips horizontal scroll when no field selected */}
          {!panelOpen && !selectedField && (
            <div className="absolute bottom-4 left-0 right-0 z-10 md:hidden">
              <div className="flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
                {riceFields.filter(f => activeFilters.includes(f.status)).map((field) => (
                  <button
                    key={field.id}
                    onClick={() => handleFieldSelect(field)}
                    className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-forest-dark shadow-lg"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: field.status === "collected" ? "#4a6b3a" : field.status === "available" ? "#e8c07d" : "#c0392b" }} />
                    {field.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <MapView
            activeFilters={activeFilters}
            selectedField={selectedField}
            onFieldSelect={handleFieldSelect}
            onGalleryClick={() => setShowGallery(true)}
          />
        </div>

        {/* Panel — Desktop: sidebar, Mobile: bottom sheet */}
        {/* Desktop sidebar */}
        <div className="hidden md:block md:h-full md:w-[380px] md:border-l md:border-gray-200">
          <FieldPanel
            selectedField={selectedField}
            onFieldSelect={handleFieldSelect}
            onProductClick={(product) => setPopupProduct(product)}
            onContactClick={() => setShowContact(true)}
            onGalleryClick={() => setShowGallery(true)}
          />
        </div>

        {/* Mobile bottom sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-20 transition-transform duration-300 ease-out md:hidden ${
            panelOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: panelExpanded ? "75vh" : "auto", maxHeight: "85vh" }}
        >
          {/* Handle bar + header */}
          <div className="rounded-t-2xl border-t border-gray-200 bg-white px-4 pt-3 pb-0 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            {/* Drag handle */}
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300" />

            {/* Peek header — always visible */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                {selectedField ? (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedField.status === "collected" ? "#4a6b3a" : selectedField.status === "available" ? "#e8c07d" : "#c0392b" }} />
                    <h3 className="text-base font-bold text-forest-dark">{selectedField.name}</h3>
                  </>
                ) : (
                  <h3 className="text-base font-bold text-forest-dark">Cánh đồng</h3>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!panelExpanded && (
                  <button
                    onClick={() => setPanelExpanded(true)}
                    className="rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-forest-dark"
                  >
                    Xem thêm
                  </button>
                )}
                <button
                  onClick={() => { setPanelOpen(false); setPanelExpanded(false); }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
            </div>

            {/* Quick info — peek mode */}
            {selectedField && !panelExpanded && (
              <div className="flex items-center gap-4 border-t border-gray-100 py-3 text-sm text-gray-500">
                <span>{selectedField.farmer}</span>
                <span>·</span>
                <span className="font-semibold text-forest">{selectedField.straw_kg.toLocaleString()} kg</span>
                <span>·</span>
                <span>{selectedField.district}</span>
              </div>
            )}
          </div>

          {/* Expanded content */}
          {panelExpanded && (
            <div className="overflow-y-auto bg-white" style={{ height: "calc(75vh - 100px)" }}>
              <FieldPanel
                selectedField={selectedField}
                onFieldSelect={(field) => {
                  handleFieldSelect(field);
                  if (!field) setPanelExpanded(true); // show list expanded
                }}
                onProductClick={(product) => setPopupProduct(product)}
                onContactClick={() => setShowContact(true)}
                onGalleryClick={() => setShowGallery(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Popups — rendered at page root, covering full viewport */}
      <AnimatePresence>
        {popupProduct && (
          <ProductPopup
            product={popupProduct}
            onClose={() => setPopupProduct(null)}
            onContact={() => {
              setPopupProduct(null);
              setShowContact(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContact && selectedField && (
          <ContactPopup
            fieldName={selectedField.name}
            onClose={() => setShowContact(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGallery && selectedField && (
          <GalleryPopup
            fieldName={selectedField.name}
            images={selectedField.images}
            onClose={() => setShowGallery(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
