import ButtonTertiary from "@/components/ui/ButtonTertiary";
import React from "react";

const DashboardPotHeader = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <h2 className="text-[1.4rem] font-bold">Pots</h2>
      <ButtonTertiary>See Details</ButtonTertiary>
    </div>
  );
};

export default DashboardPotHeader;
