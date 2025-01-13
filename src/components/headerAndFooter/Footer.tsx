/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) return null;

  const navLinks = [
    {
      title: "Overview",
      img: "/images/icon-nav-overview.svg",
      selectedImg: "/images/icon-nav-overview-selected.svg",
      link: "/",
    },
    {
      title: "Transactions",
      img: "/images/icon-nav-transactions.svg",
      selectedImg: "/images/icon-nav-transactions-selected.svg",
      link: "/transactions",
    },
    {
      title: "Budgets",
      img: "/images/icon-nav-budgets.svg",
      selectedImg: "/images/icon-nav-budgets-selected.svg",
      link: "/budgets",
    },
    {
      title: "Pots",
      img: "/images/icon-nav-pots.svg",
      selectedImg: "/images/icon-nav-pots-selected.svg",
      link: "/pots",
    },
    {
      title: "Recurring Payments",
      img: "/images/icon-nav-recurring-bills.svg",
      selectedImg: "/images/icon-nav-recurring-bills-selected.svg",
      link: "/recurring-payments",
    },
  ];
  return (
    <footer className="bg-greyDark flex justify-between p-6 text-white sticky bottom-0 rounded-t-xl items-center">
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
