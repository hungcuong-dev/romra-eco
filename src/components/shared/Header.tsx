"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CDN } from "@/lib/constants";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/map", label: "Bản đồ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/about", label: "Về chúng tôi" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-forest-dark/95 shadow-xl backdrop-blur-lg"
          : "bg-forest-dark/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.03]">
          <Image
            src={`${CDN}/images/logo.png`}
            alt="Rơm Rả Eco Logo"
            width={42}
            height={42}
            className="rounded-xl shadow-md"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-wide text-white" style={{ fontFamily: "var(--font-heading), serif" }}>
              Rơm Rả Eco
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 sm:block">
              Bao bì sinh học
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/map"
            className="ml-4 rounded-full bg-gold/90 px-5 py-2 text-sm font-semibold text-forest-dark transition-all hover:-translate-y-0.5 hover:bg-gold hover:shadow-lg hover:shadow-gold/20"
          >
            Khám phá ngay
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/map"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-xl bg-gold/90 px-4 py-3 text-center text-sm font-semibold text-forest-dark"
              >
                Khám phá ngay
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
