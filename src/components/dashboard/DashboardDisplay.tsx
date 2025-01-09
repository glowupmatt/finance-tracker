"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import SessionForm from "../sessionForm/SessionForm";

const DashboardDisplay = () => {
  const session = useSession();
  useEffect(() => {}, [session]);

  if (session.status !== "authenticated") {
    return <SessionForm />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default DashboardDisplay;
