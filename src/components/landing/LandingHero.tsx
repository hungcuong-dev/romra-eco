"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CTAButton from "@/components/shared/CTAButton";

export default function LandingHero() {
  return (
    <section className="relative flex h-[calc(100vh-64px)] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/background.png"
          alt="Cánh đồng lúa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest-dark/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/logo.png"
            alt="Rơm Rả Eco"
            width={100}
            height={100}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl"
        >
          RƠM RẢ LAN NIỀM VUI
          <br />
          RƠM RẠ LAN LỐI SỐNG XANH
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
        >
          Giải pháp đột phá giảm thiểu rác thải nhựa, tận dụng nguồn phế phẩm
          nông nghiệp dồi dào, bảo vệ môi trường và hỗ trợ người nông dân.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <CTAButton href="/map">Khám phá bản đồ</CTAButton>
          <CTAButton href="/products" variant="outline">
            Xem sản phẩm
          </CTAButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            { value: "47 triệu tấn", label: "rơm rạ mỗi năm tại VN" },
            { value: "3-6 tháng", label: "phân hủy hoàn toàn" },
            { value: "0%", label: "nhựa & hóa chất độc hại" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gold">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-6 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest text-white/40">CUỘN XUỐNG</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
