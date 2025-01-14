/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { navLinks } from "@/utils/navLinks";

const Footer = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) return null;

  return (
    <footer className="bg-greyDark flex justify-between px-6 py-3 text-white sticky bottom-0 rounded-t-xl items-center lg:hidden lg:justify-around">
      {navLinks.map((navLink, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center" ${
            pathname === navLink.link
              ? "bg-white px-6 py-4 rounded-t-xl border-b-4 border-secondaryGreen gap-3"
              : "gap-3"
          }`}
        >
          <Link href={navLink.link}>
            <img
              src={`${
                pathname === navLink.link ? navLink.selectedImg : navLink.img
              }`}
              alt="icon"
            />
          </Link>
          <p
            className={`hidden md:block${
              pathname === navLink.link ? "text-black" : "text-greyLight"
            }`}
          >
            {navLink.title}
          </p>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
