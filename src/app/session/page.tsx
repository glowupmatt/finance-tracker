"use client";

import React, { useEffect } from "react";
import SessionForm from "./sessionForm/SessionForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  return <SessionForm />;
};

export default Page;
