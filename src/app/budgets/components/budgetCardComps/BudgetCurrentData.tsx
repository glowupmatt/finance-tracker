import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

type Props = {
  budget: {
    maxSpend: number;
    colorTag: string;
    transactions: { amount: number }[];
  };
  type: "SPENT" | "SAVED";
};

const BudgetCurrentData = (props: Props) => {
  const { budget, type } = props;

  const transactionTotal =
    budget.transactions?.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0) || 0;

  const remainingTotal = budget.maxSpend - transactionTotal;

  const savedOrSpent = type === "SPENT" ? transactionTotal : remainingTotal;
  const remainingOrSpent = type === "SPENT" ? "Spent" : "Remaining";
  const ternaryStyle = type === "SPENT" ? budget.colorTag : "#F8F4F0";

  return (
    <>
      <div className="flex justify-start items-center gap-3 w-full">
        <div className="text-greySemiDark text-[.7rem] flex gap-1 w-full h-full ">
          <span
            className="w-[.2rem] h-full rounded-md"
            style={{ backgroundColor: ternaryStyle }}
          />
          <div>
            <p>{remainingOrSpent}</p>
            <span className="font-bold text-[1rem] text-greyDark">
              {formatCurrency(savedOrSpent)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetCurrentData;
