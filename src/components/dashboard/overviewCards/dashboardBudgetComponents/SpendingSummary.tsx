import ColorSideTab from "@/components/ui/ColorSideTab";
import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { BudgetType } from "@/types/BudgetTypes";
import { transactionReducer } from "@/utils/transactionReducer";

type Props = {
  sortedBudgets: BudgetType[] | undefined;
};

const SpendingSummary = (props: Props) => {
  const { sortedBudgets } = props;
  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:flex-col">
      {sortedBudgets?.map((budget, index) => {
        return (
          <div key={index} className="flex items-center justify-start gap-2">
            <ColorSideTab color={budget.color} />
            <div>
              <p>{budget.name}</p>
              {budget.transactions && budget.transactions.length > 0 ? (
                <p>{formatCurrency(transactionReducer(budget.transactions))}</p>
              ) : (
                <p>{formatCurrency(0)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpendingSummary;
