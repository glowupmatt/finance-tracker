/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

type Props = {
  navLink: {
    link: string;
    img: string;
    selectedImg: string;
    title: string;
  };
  index: number;
  pathname: string | null;
};

const LinkButton = ({ index, pathname, navLink }: Props) => {
  const iconStyles = `flex flex-col items-center lg:flex-row justify-start gap-4 px-8 ${
    pathname === navLink.link
      ? "bg-white py-4 rounded-r-xl border-b-4 w-[15rem] border-secondaryGreen"
      : "w-full"
  }`;

  const imageTernary =
    pathname === navLink.link ? navLink.selectedImg : navLink.img;

  const textStyles = `hidden md:block w-full   ${
    pathname === navLink.link ? "text-black" : "text-greyLight hover:text-white"
  }`;

  return (
    <Link href={navLink.link} key={index} className={iconStyles}>
      <div>
        <img src={imageTernary} alt="icon" />
      </div>
      <p className={textStyles}>{navLink.title}</p>
    </Link>
  );
};

export default LinkButton;
