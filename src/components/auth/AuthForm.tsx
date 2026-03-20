"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    if (mode === "register") {
      const confirmPassword = formData.get("confirmPassword") as string;
      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        setIsPending(false);
        return;
      }

      const displayName = formData.get("displayName") as string;
      const phone = formData.get("phone") as string;
      const company = formData.get("company") as string;
      const address = formData.get("address") as string;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            phone,
            company: company || null,
            address: address || null,
          },
        },
      });

      if (error) {
        setError(error.message);
        setIsPending(false);
        return;
      }

      router.push("/auth/login?registered=true");
      return;
    }

    // Login
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setIsPending(false);
      return;
    }

    // Auth state change triggers AuthProvider automatically
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-2xl font-bold text-forest-dark">
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          {mode === "login"
            ? "Đăng nhập để tham gia chiến dịch gây quỹ"
            : "Tạo tài khoản để bắt đầu tích giọt nước"}
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-forest-dark">
                  Họ và tên <span className="text-red-400">*</span>
                </label>
                <input
                  name="displayName"
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-forest-dark">
                  Số điện thoại <span className="text-red-400">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="0901234567"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-forest-dark">
                  Tên doanh nghiệp <span className="text-xs text-gray-400">(nếu có)</span>
                </label>
                <input
                  name="company"
                  type="text"
                  placeholder="Công ty ABC"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-forest-dark">
                  Địa chỉ liên hệ <span className="text-xs text-gray-400">(nếu có)</span>
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="123 Nguyễn Văn Linh, Đà Nẵng"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-forest-dark">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-forest-dark">
              Mật khẩu <span className="text-red-400">*</span>
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Tối thiểu 6 ký tự"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-forest-dark">
                Xác nhận mật khẩu <span className="text-red-400">*</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder="Nhập lại mật khẩu"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-gold py-3 text-sm font-bold text-forest-dark transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
          >
            {isPending
              ? "Đang xử lý..."
              : mode === "login"
                ? "Đăng nhập"
                : "Đăng ký"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === "login" ? (
            <>
              Chưa có tài khoản?{" "}
              <Link href="/auth/register" className="font-medium text-forest hover:underline">
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="font-medium text-forest hover:underline">
                Đăng nhập
              </Link>
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}
