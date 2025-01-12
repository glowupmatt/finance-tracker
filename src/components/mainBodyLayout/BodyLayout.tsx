"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

function BodyLayout({ children }: Props) {
  return (
    <SessionProvider>
      <div className="items-center justify-center bg-beigeLight 2xl:justify-center relative">
        <div className="max-w-[2560px]">{children}</div>
      </div>
    </SessionProvider>
  );
}

export default BodyLayout;
