import React from "react";
import { formatter } from "@/utils/transactionFunctions";
import { BudgetType } from "@/types/BudgetTypes";
import { formatCurrency } from "@/utils/formatCurrency";
import BudgetIconTitle from "./BudgetIconTitle";
import AddTransactionModal from "./AddTransactionModal";

type Props = {
  budget: BudgetType;
};

const BudgetSpendHistory = (props: Props) => {
  const { budget } = props;

  return (
    <>
      <AddTransactionModal budget={budget} />
      {budget.transactions
        ?.filter((_, index) => index < 3)
        .map((transaction) => {
          return (
            <div
              key={transaction.id}
              className="flex justify-between items-center py-2"
            >
              <BudgetIconTitle transaction={transaction} />
              <div className="flex flex-col items-end">
                <p className="font-bold text-[1rem]">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="font-light text-greySemiDark text-[.8rem]">
                  {formatter.format(new Date(transaction.date))}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default BudgetSpendHistory;
