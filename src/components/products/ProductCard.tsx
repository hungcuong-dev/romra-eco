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
      <div className="relative h-36 overflow-hidden bg-cream sm:h-56">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105 sm:p-4"
        />
      </div>
      <div className="p-3 sm:p-5">
        <h3 className="mb-1 text-sm font-bold text-forest sm:mb-2 sm:text-lg">{product.shortTitle}</h3>
        <p className="mb-2 line-clamp-2 hidden text-sm text-gray-600 sm:block">{product.description}</p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-medium text-forest sm:px-3 sm:py-1 sm:text-xs">
            {product.size}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
