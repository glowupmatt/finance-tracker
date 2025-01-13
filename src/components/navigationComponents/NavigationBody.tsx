/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Header from "./mobileNav/Header";
import Footer from "./mobileNav/Footer";
import SideNav from "./desktopNav/SideNav";

type Props = {
  children: React.ReactNode;
};

function NavigationBody({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex-col lg:flex-row relative ${
        isOpen ? "lg:flex" : "lg:block"
      }`}
    >
      <div
        className={`bg-greyDark min-w-[300px] min-h-screen h-full rounded-r-xl 
              ${isOpen ? "lg:block hidden" : "lg:hidden hidden"}`}
      >
        <SideNav />
      </div>

      <div
        className={`absolute top-0 z-50 ${isOpen ? "left-[196px]" : "left-0"}`}
      >
        <div className="fixed bottom-3 left-0 mb-5 ml-5 lg:block hidden">
          {isOpen ? (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
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
              onClick={() => setIsOpen((prev) => !prev)}
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
