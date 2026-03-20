"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/products/ProductCard";
import ProductModal from "@/components/products/ProductModal";
import { products } from "@/data/products";
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
