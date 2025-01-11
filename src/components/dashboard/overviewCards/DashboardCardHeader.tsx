import ButtonTertiary from "@/components/ui/ButtonTertiary";
import React from "react";
import Link from "next/link";

type DashboardCardHeaderProps = {
  title: string;
  buttonText: string;
  link: string;
};

const DashboardCardHeader = ({
  title,
  buttonText,
  link,
}: DashboardCardHeaderProps) => {
  return (
    <Link
      href={`/${link}`}
      className="flex justify-between items-center w-full"
    >
      <h2 className="text-[1.4rem] font-bold">{title}</h2>
      <ButtonTertiary>{buttonText}</ButtonTertiary>
    </Link>
  );
};

export default DashboardCardHeader;
