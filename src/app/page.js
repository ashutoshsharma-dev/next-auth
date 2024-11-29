"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  useLayoutEffect(() => {
    if (status === "loading") {
      return;
    }

    // Redirect if authenticated
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <button onClick={() => signIn('github', { callbackUrl: '/dashboard' })} className="bg-black py-2 px-4 rounded-lg text-white">
        Login with Github
      </button>

    </div>
  );
}
