import { PotType } from "@/types/PotTypes";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DialogPOST from "./POSTcomps/DialogPOST";
import { BudgetType } from "@/types/BudgetTypes";

type Props = {
  pot?: PotType;
  type: "POT" | "BUDGET";
  budget?: BudgetType;
};

const EditModal = (props: Props) => {
  const { pot, type, budget } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const data = type === "POT" ? pot : budget;
  return (
    <div className="relative">
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <BiDotsVerticalRounded />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 top-[1rem] p-4 min-w-[9rem] text-center bg-white rounded-lg shadow-md border-[.2px] border-greyDark z-10">
          <DialogPOST type={type} CRUD="PUT" data={data} />
          <div className="w-full h-[1px] border-[1px] rounded-md my-[.2rem]" />
          <DialogPOST type={type} CRUD="DELETE" data={data} />
        </div>
      )}
    </div>
  );
};

export default EditModal;
