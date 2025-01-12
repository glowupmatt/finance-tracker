"use client";
import React from "react";
import { useBudgetFormat } from "@/hooks/useBudgetFormat";
import { useUser } from "@/context/UserContext";
import { transactionReducer } from "@/utils/transactionReducer";
import BudgetChart from "./BudgetChart";
import ColorSideTab from "@/components/ui/ColorSideTab";
import { formatCurrency } from "@/utils/formatCurrency";

const BudgetDoughnutChart = () => {
  const { budgets } = useUser();
  const { sortedBudgets } = useBudgetFormat(budgets);

  return (
    <div className="flex flex-col gap-4">
      <BudgetChart sortedBudgets={sortedBudgets} />
      <div className="grid grid-cols-2 gap-4">
        {sortedBudgets?.map((budget, index) => {
          return (
            <div key={index} className="flex items-center justify-start gap-2">
              <ColorSideTab color={budget.color} />
              <div>
                <p>{budget.name}</p>
                {budget.transactions && budget.transactions.length > 0 ? (
                  <p>
                    {formatCurrency(transactionReducer(budget.transactions))}
                  </p>
                ) : (
                  <p>{formatCurrency(0)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetDoughnutChart;
