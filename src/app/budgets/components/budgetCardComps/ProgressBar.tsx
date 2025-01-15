import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

type Props = {
  budget: {
    maxSpend: number;
    color: string;
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
      <div className="relative h-[32px] bg-gray-200 w-full rounded-md p-1 flex items-center">
        <div
          className="h-[80%] absolute rounded-sm"
          style={{ width: `${percentage}%`, backgroundColor: budget.color }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
