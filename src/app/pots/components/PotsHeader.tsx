import React from "react";
import { PotType } from "@/types/PotTypes";

type Props = {
  pot: PotType;
};

const PotsHeader = (props: Props) => {
  const { pot } = props;
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: pot.colorTag }}
      />
      <h2>{pot.title}</h2>
    </div>
  );
};

export default PotsHeader;
