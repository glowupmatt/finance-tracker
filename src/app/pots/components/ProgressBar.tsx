import { PotType } from "@/types/PotTypes";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

type Props = {
  pot: PotType;
  type?: "ADD-TRANSACTION";
  amountToAdd?: number;
  isDeposit?: boolean;
};

function ProgressBar({ pot, type, amountToAdd, isDeposit }: Props) {
  const transactionTotal =
    pot.transactions?.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0) || 0;

  const adjustedAmountToAdd = isDeposit
    ? amountToAdd || 0
    : -(amountToAdd || 0);

  const newTransactionTotal = transactionTotal + (adjustedAmountToAdd || 0);

  const percentage = (transactionTotal / pot.targetAmount) * 100;

  const newPercentage =
    ((transactionTotal + (adjustedAmountToAdd || 0)) / pot.targetAmount) * 100;

  const displayPercentage =
    type === "ADD-TRANSACTION" ? newPercentage : percentage;
  const displayAmount =
    type === "ADD-TRANSACTION" ? newTransactionTotal : transactionTotal;

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center">
        <p className="text-greySemiDark text-[.7rem]">Total Saved</p>
        <p className="text-greyDark text-[1.7rem] font-bold">
          {formatCurrency(displayAmount)}
        </p>
      </div>
      <div>
        <div className="relative h-[8px] bg-gray-200 w-full rounded-md flex items-center">
          {displayPercentage !== 100 || newPercentage !== 100 ? (
            <>
              <div
                className="h-[90%] absolute rounded-sm"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: pot.colorTag,
                }}
              />
              {type === "ADD-TRANSACTION" && (
                <div
                  className="h-[90%] absolute rounded-sm"
                  style={{
                    width: `${Math.abs(newPercentage - percentage)}%`,
                    backgroundColor: isDeposit ? "#277C78" : "#C94736",
                    left: isDeposit ? `${percentage}%` : `${newPercentage}%`,
                  }}
                />
              )}
            </>
          ) : (
            <div
              className="h-[90%] absolute rounded-sm"
              style={{ width: "100%", backgroundColor: "#277C78" }}
            />
          )}
        </div>

        <div className="flex justify-between mt-2 font-light text-[.6rem]">
          <p className="text-greyDark">{displayPercentage}%</p>
          <p className="text-greySemiDark">
            Target of {formatCurrency(pot.targetAmount)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
