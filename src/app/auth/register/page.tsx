"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/shared/Header";
import AuthForm from "@/components/auth/AuthForm";
import { useUser } from "@/components/auth/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !loading) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (user) return null;

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-cream px-4 py-12">
        <AuthForm mode="register" />
      </main>
    </>
  );
}
