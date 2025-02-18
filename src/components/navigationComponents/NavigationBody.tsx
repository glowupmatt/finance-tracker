/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Header from "./mobileNav/Header";
import Footer from "./mobileNav/Footer";
import SideNav from "./desktopNav/SideNav";
import { useUser } from "@/context/UserContext";

type Props = {
  children: React.ReactNode;
};

function NavigationBody({ children }: Props) {
  const { isOpen, setIsOpen } = useUser();

  return (
    <div className={`flex-col lg:flex-row  ${isOpen ? "lg:flex" : "lg:block"}`}>
      <div
        className={`bg-greyDark min-w-[300px] rounded-r-xl z-[9] h-full superBased:h-screen ${
          isOpen
            ? "based:absolute superBased:relative superBased:block"
            : "hidden"
        }`}
      >
        <SideNav />
      </div>

      <div
        className={`hidden lg:block absolute top-0 z-50 ${
          isOpen ? "left-[196px]" : "left-0"
        }`}
      >
        <div className="fixed bottom-3 left-0 mb-5 ml-5 lg:block hidden">
          {isOpen ? (
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white p-4 rounded-full"
            >
              <img
                src="/images/icon-minimize-menu.svg"
                alt="close side bar"
                className="h-5 w-5"
              />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-greyDark p-4 rounded-full"
            >
              <img
                src="/images/icon-minimize-menu.svg"
                alt="open side bar"
                className="h-5 w-5 rotate-180"
              />
            </button>
          )}
        </div>
      </div>

      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default NavigationBody;
