/* eslint-disable @next/next/no-img-element */
import React from "react";
type TotalSavedDisplayProps = {
  totalSaved: string | null;
};

const TotalSavedDisplay = ({ totalSaved }: TotalSavedDisplayProps) => {
  return (
    <div className="flex justify-start gap-[2rem] items-center w-full mt-4 bg-beigeLight p-4 rounded-lg lg:w-full lg:gap-[1rem]">
      <img
        src="/images/icon-pot.svg"
        alt="pot icon"
        className="w-[40px] h-[40px]"
      />
      <div className="flex flex-col gap-3 justify-between items-start w-full">
        <p className="text-greySemiDark">Total Saved</p>
        <p className="text-black text-[2rem] font-bold lg:text-[3rem]">
          {totalSaved}
        </p>
      </div>
    </div>
  );
};

export default TotalSavedDisplay;
