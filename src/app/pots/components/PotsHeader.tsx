"use client";

import React from "react";
import { PotType } from "@/types/PotTypes";

import EditModal from "@/components/CRUDmodals/EditModal";

type Props = {
  pot: PotType;
};

const PotsHeader = (props: Props) => {
  const { pot } = props;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: pot.colorTag }}
        />
        <h2>{pot.title}</h2>
      </div>
      <EditModal pot={pot} type="POT" />
    </div>
  );
};

export default PotsHeader;
