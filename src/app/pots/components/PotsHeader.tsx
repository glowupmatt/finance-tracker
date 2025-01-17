"use client";

import React, { useState } from "react";
import { PotType } from "@/types/PotTypes";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import { BiDotsVerticalRounded } from "react-icons/bi";

type Props = {
  pot: PotType;
};

const PotsHeader = (props: Props) => {
  const { pot } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: pot.colorTag }}
        />
        <h2>{pot.title}</h2>
      </div>
      <div className="relative">
        <div
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <BiDotsVerticalRounded />
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-[1rem] p-4 min-w-[9rem] text-center bg-white rounded-lg shadow-md">
            <DialogPOST type="POT" CRUD="PUT" potData={pot} />
            <div className="w-full h-[1px] border-[1px] rounded-md my-[.2rem]" />
            <DialogPOST type="POT" CRUD="DELETE" potData={pot} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PotsHeader;
