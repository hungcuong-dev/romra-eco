"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CDN } from "@/lib/constants";

interface IntroOverlayProps {
  onComplete: () => void;
}

const TOTAL_DURATION = 5000;

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const handleSkip = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => onComplete(), TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #1e3a1a 0%, #152e12 40%, #0b1a08 100%)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/[0.03]"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: 200 + i * 180,
            height: 200 + i * 180,
            opacity: 1,
          }}
          transition={{ delay: 0.3 + i * 0.3, duration: 1.5, ease: "easeOut" }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full bg-gold/20"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
          }}
          initial={{
            x: (Math.random() - 0.5) * 800,
            y: (Math.random() - 0.5) * 600,
            opacity: 0,
          }}
          animate={{
            y: [(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600 - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Green ambient glow */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ delay: 0.5, duration: 2 }}
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,107,58,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with glow ring */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.15, 1], opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow behind logo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            transition={{ delay: 0.8, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            style={{
              background: "radial-gradient(circle, rgba(232,192,125,0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: "scale(2.5)",
            }}
          />
          <Image
            src={`${CDN}/images/logo.png`}
            alt="Rơm Rả Eco"
            width={110}
            height={110}
            className="relative rounded-full shadow-2xl shadow-black/60 ring-2 ring-gold/20"
            priority
          />
        </motion.div>

        {/* Brand name — large, overflow visible for diacritics */}
        <div className="mt-8 overflow-visible">
          <div className="flex items-center justify-center gap-3 md:gap-5">
            {/* RƠM */}
            <motion.span
              initial={{ x: -60, opacity: 0, filter: "blur(12px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-extrabold tracking-wider text-white sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ fontFamily: "var(--font-heading), serif", lineHeight: 1.2 }}
            >
              RƠM
            </motion.span>

            {/* RẢ */}
            <motion.span
              initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-extrabold tracking-wider text-gold sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ fontFamily: "var(--font-heading), serif", lineHeight: 1.2 }}
            >
              RẢ
            </motion.span>

            {/* ECO */}
            <motion.span
              initial={{ x: 60, opacity: 0, filter: "blur(12px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-extrabold tracking-wider text-sage sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ fontFamily: "var(--font-heading), serif", lineHeight: 1.2 }}
            >
              ECO
            </motion.span>
          </div>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.4, duration: 0.7, ease: "easeOut" }}
          className="mt-6 h-[2px] w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent md:w-40"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="mt-5 text-center text-xl font-medium tracking-[0.12em] text-white/80 md:text-2xl"
        >
          Bao bì sinh học từ rơm rạ
        </motion.p>

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.8 }}
          className="mt-3 text-center text-base tracking-[0.12em] text-gold/70 md:text-lg"
        >
          Rơm rả lan niềm vui - Rơm rạ lan lối sống xanh
        </motion.p>
      </div>

      {/* Skip */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-[101] text-[11px] font-medium tracking-wider text-white/15 transition-colors hover:text-white/40"
      >
        BỎ QUA
      </motion.button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-[101] h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-forest via-gold/50 to-forest"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
