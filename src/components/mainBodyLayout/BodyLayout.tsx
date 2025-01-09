import React from "react";

type Props = {
  children?: React.ReactNode;
};

function BodyLayout({ children }: Props) {
  return (
    <div className="flex items-center justify-start bg-beigeLight 2xl:justify-center relative">
      <div className="max-w-[2560px]">{children}</div>
    </div>
  );
}

export default BodyLayout;
