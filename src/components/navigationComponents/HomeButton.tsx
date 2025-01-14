/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const HomeButton = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-start lg:pl-8 lg:h-[101px] lg:w-[300px]"
    >
      <img
        src="/images/logo-large.svg"
        alt="logo"
        className="cursor-pointer hidden lg:block"
      />
      <img
        src="/images/logo-large-black.svg"
        alt="logo"
        className="cursor-pointer lg:hidden"
      />
    </Link>
  );
};

export default HomeButton;
