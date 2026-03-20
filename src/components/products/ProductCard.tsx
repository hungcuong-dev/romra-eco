"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-forest">{product.shortTitle}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-forest">
            {product.size}
          </span>
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-forest">
            {product.weight}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
