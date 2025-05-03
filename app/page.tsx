"use client";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/dashboard");
    }
  }, [ready, authenticated, router]);

  if (!ready) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={login}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Entrar a TandasApp
      </button>
    </div>
  );
}
