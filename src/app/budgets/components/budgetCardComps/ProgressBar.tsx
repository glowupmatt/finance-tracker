import { formatCurrency } from "@/utils/formatCurrency";
import { translateColorToHex } from "@/utils/translateColorToHex";
import React from "react";

type Props = {
  budget: {
    maxSpend: number;
    colorTag: string;
    transactions: { amount: number }[];
  };
};

const ProgressBar = (props: Props) => {
  const { budget } = props;
  const transactionTotal =
    budget.transactions?.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0) || 0;
  const percentage = (transactionTotal / budget.maxSpend) * 100;
  return (
    <>
      <p className="text-greySemiDark text-[.7rem]">
        Max Spend: {formatCurrency(budget.maxSpend)}
      </p>
      <div className="relative h-[32px] bg-gray-200 w-full rounded-md py-1 flex items-center overflow-hidden">
        <div
          className="h-[80%] absolute rounded-md max-w-full "
          style={{
            width: `${percentage}%`,
            backgroundColor: translateColorToHex(budget.colorTag),
          }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
