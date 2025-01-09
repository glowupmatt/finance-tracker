"use client";
import SessionForm from "@/components/sessionForm/SessionForm";
import DashboardDisplay from "@/components/dashboard/DashboardDisplay";
import { useSession } from "@/app/context/SessionContext";

export default function Home() {
  const { user } = useSession();

  if (!user) {
    return <SessionForm />;
  }

  return <DashboardDisplay />;
}
