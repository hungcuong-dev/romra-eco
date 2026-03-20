"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/shared/Header";
import AuthForm from "@/components/auth/AuthForm";
import { useUser } from "@/components/auth/AuthProvider";

function LoginContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !loading) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (user) return null;

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        {registered && (
          <div className="mb-4 rounded-xl bg-forest/10 px-4 py-3 text-center text-sm text-forest-dark">
            Đăng ký thành công! Kiểm tra email để xác minh tài khoản.
          </div>
        )}
        <AuthForm mode="login" />
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <Suspense>
        <LoginContent />
      </Suspense>
    </>
  );
}
