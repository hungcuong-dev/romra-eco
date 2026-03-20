"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CDN } from "@/lib/constants";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/map", label: "Bản đồ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/news", label: "Bảng tin" },
  { href: "/about", label: "Về chúng tôi" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Show welcome only once per login session
  useEffect(() => {
    if (user && !loading) {
      const welcomed = sessionStorage.getItem("welcomed");
      if (!welcomed) {
        sessionStorage.setItem("welcomed", "true");
        setShowWelcome(true);
        const timer = setTimeout(() => setShowWelcome(false), 4000);
        return () => clearTimeout(timer);
      }
    }
    if (!user && !loading) {
      sessionStorage.removeItem("welcomed");
    }
  }, [user, loading]);

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

          {/* Auth */}
          {!loading && (
            user ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 transition-colors hover:bg-white/15"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-forest-dark">
                    {(user.user_metadata?.display_name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user.user_metadata?.display_name || user.email?.split("@")[0]}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl bg-white py-1 shadow-xl"
                    >
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="text-sm font-medium text-forest-dark">
                          {user.user_metadata?.display_name || "User"}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={async () => {
                          const supabase = createClient();
                          await supabase.auth.signOut();
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        Đăng xuất
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="ml-4 rounded-full bg-gold/90 px-5 py-2 text-sm font-semibold text-forest-dark transition-all hover:-translate-y-0.5 hover:bg-gold hover:shadow-lg hover:shadow-gold/20"
              >
                Đăng nhập
              </Link>
            )
          )}
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
              {!loading && (
                user ? (
                  <div>
                    <button
                      onClick={async () => {
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        setMobileOpen(false);
                      }}
                      className="mt-2 block w-full rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-medium text-white/70"
                    >
                      Đăng xuất ({user.user_metadata?.display_name || user.email?.split("@")[0]})
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 block rounded-xl bg-gold/90 px-4 py-3 text-center text-sm font-semibold text-forest-dark"
                  >
                    Đăng nhập
                  </Link>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Click outside to close dropdown */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}

      {/* Welcome toast */}
      <AnimatePresence>
        {showWelcome && user && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-4 top-20 z-[60] rounded-xl bg-white px-5 py-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-xl">
                👋
              </div>
              <div>
                <p className="text-sm font-semibold text-forest-dark">
                  Chào mừng, {user.user_metadata?.display_name || "bạn"}!
                </p>
                <p className="text-xs text-gray-400">Chúc bạn một ngày tốt lành</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
