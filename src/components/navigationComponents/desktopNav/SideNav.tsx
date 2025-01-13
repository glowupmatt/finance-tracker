/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { navLinks } from "@/utils/navLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SideNav = () => {
  const { user } = useUser();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <div className={"hidden lg:flex flex-col justify-between"}>
      <Link
        href="/"
        className="flex items-center justify-start pl-8 h-[101px] w-[300px]"
      >
        <img
          src="/images/logo-large.svg"
          alt="logo"
          className="cursor-pointer"
        />
      </Link>
      <div className="flex flex-col justify-between h-[calc(80vh-101px)]">
        <div className="flex flex-col gap-8">
          {navLinks.map((navLink, index) => (
            <Link
              href={navLink.link}
              key={index}
              className={`flex flex-col items-center lg:flex-row justify-start gap-4 px-8 ${
                pathname === navLink.link
                  ? "bg-white py-4 rounded-r-xl border-b-4 w-[15rem] border-secondaryGreen"
                  : "w-full"
              }`}
            >
              <div>
                <img
                  src={`${
                    pathname === navLink.link
                      ? navLink.selectedImg
                      : navLink.img
                  }`}
                  alt="icon"
                />
              </div>
              <p
                className={`hidden md:block w-full   ${
                  pathname === navLink.link
                    ? "text-black"
                    : "text-greyLight hover:text-white"
                }`}
              >
                {navLink.title}
              </p>
            </Link>
          ))}
        </div>
        <Button
          variant="destroy"
          onClick={() => signOut()}
          className="w-[15rem] rounded-r-xl rounded-l-none p-4 text-[1rem] relative top-0"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
