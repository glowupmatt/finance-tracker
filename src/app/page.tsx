"use client";

import { useEffect } from "react";
import SessionForm from "@/components/sessionForm/SessionForm";
import DashboardDisplay from "@/components/dashboard/DashboardDisplay";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  useEffect(() => {}, [session]);

  if (session.status === "authenticated") {
    return <DashboardDisplay />;
  }

  return <SessionForm />;
}
