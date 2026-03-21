"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/products/ProductCard";
import ProductModal from "@/components/products/ProductModal";
import { products } from "@/data/products";
import { CDN } from "@/lib/constants";
import type { Product } from "@/types";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-gradient-to-r from-forest to-forest-dark px-4 py-16 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Bộ sưu tập sản phẩm
          </h1>
          <p className="mx-auto max-w-xl text-white/80">
            Khám phá các giải pháp bao bì sinh học tiên tiến từ rơm rạ
          </p>
        </section>

        {/* Product Grid */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </section>

        {/* Certification Section */}
        <section className="bg-forest-dark px-4 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
          >
            <div className="grid items-center gap-0 md:grid-cols-2">
              {/* Cert image */}
              <div className="relative">
                <Image
                  src={`${CDN}/images/cert.jpg`}
                  alt="Chứng nhận sản phẩm xanh Rơm Rả Eco"
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10">
                <span className="mb-3 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
                  Chứng nhận
                </span>
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Chứng nhận Sản phẩm Xanh
                </h2>
                <p className="mb-5 leading-relaxed text-white/70">
                  Mỗi đơn hàng từ Rơm Rả Eco đều đi kèm{" "}
                  <span className="font-semibold text-gold">
                    Giấy chứng nhận Sản phẩm Xanh
                  </span>{" "}
                  — xác nhận bạn đã đóng góp vào việc giảm thiểu rác thải nhựa
                  và bảo vệ môi trường.
                </p>

                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold">
                      ✓
                    </span>
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">Chứng nhận cá nhân hóa</span>
                      {" "}— ghi rõ tên doanh nghiệp/cá nhân mua hàng
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold">
                      ✓
                    </span>
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">Tác động thật</span>
                      {" "}— số lượng bao bì xanh thay thế nhựa được ghi nhận
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold">
                      ✓
                    </span>
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">Chia sẻ được</span>
                      {" "}— phù hợp trưng bày tại cửa hàng, văn phòng hoặc đăng mạng xã hội
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/10 p-4 text-center">
                  <p className="text-sm font-semibold text-gold">
                    Mua sản phẩm Rơm Rả = Nhận chứng nhận Xanh
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    Tự động gửi kèm với mọi đơn hàng
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
