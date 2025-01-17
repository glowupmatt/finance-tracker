"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    }
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
}
