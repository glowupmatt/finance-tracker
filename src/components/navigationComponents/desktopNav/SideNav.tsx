"use client";

import React from "react";
import { navLinks } from "@/utils/navLinks";
import { usePathname } from "next/navigation";
import LinkButton from "./LinkButton";
import HomeButton from "../HomeButton";
import SignOutButton from "./SignOutButton";
import { useUser } from "@/context/UserContext";

const SideNav = () => {
  const { user } = useUser();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <div className={"hidden lg:flex flex-col justify-between"}>
      <HomeButton />
      <div className="flex flex-col justify-between h-[calc(80vh-101px)]">
        <div className="flex flex-col gap-8">
          {navLinks.map((navLink, index) => (
            <LinkButton
              key={index}
              pathname={pathname}
              navLink={navLink}
              index={index}
            />
          ))}
        </div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default SideNav;
