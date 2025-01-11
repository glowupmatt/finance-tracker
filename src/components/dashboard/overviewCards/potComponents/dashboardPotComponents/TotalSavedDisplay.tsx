/* eslint-disable @next/next/no-img-element */
import React from "react";
type TotalSavedDisplayProps = {
  totalSaved: string | null;
};

const TotalSavedDisplay = ({ totalSaved }: TotalSavedDisplayProps) => {
  return (
    <div className="flex justify-start gap-[2rem] items-center w-full mt-4 bg-beigeLight p-4 rounded-lg">
      <img
        src="/images/icon-pot.svg"
        alt="pot icon"
        className="w-[40px] h-[40px]"
      />
      <div className="flex flex-col gap-3 justify-between items-start">
        <p className="text-greySemiDark">Total Saved</p>
        <p className="text-black text-[3rem] font-bold">{totalSaved}</p>
      </div>
    </div>
  );
};

export default TotalSavedDisplay;
