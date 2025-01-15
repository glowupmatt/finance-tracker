import { PotType } from "@/types/PotTypes";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

type Props = {
  pot: PotType;
};

function ProgressBar({ pot }: Props) {
  const transactionTotal =
    pot.transactions?.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0) || 0;

  const percentage = (transactionTotal / pot.targetAmount) * 100;

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-greySemiDark text-[.7rem]">Total Saved</p>
        <p className="text-greyDark text-[1.7rem] font-bold">
          {formatCurrency(transactionTotal)}
        </p>
      </div>
      <div>
        <div className="relative h-[8px] bg-gray-200 w-full rounded-md flex items-center">
          <div
            className="h-[90%] absolute rounded-sm"
            style={{ width: `${percentage}%`, backgroundColor: pot.color }}
          />
        </div>
        <div className="flex justify-between mt-2 font-light text-[.6rem]">
          <p className="text-greyDark">{percentage}%</p>
          <p className="text-greySemiDark">
            Target of {formatCurrency(pot.targetAmount)}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
