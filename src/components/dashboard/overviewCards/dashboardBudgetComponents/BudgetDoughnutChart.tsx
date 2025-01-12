"use client";
import React from "react";
import { useBudgetFormat } from "@/hooks/useBudgetFormat";
import { useUser } from "@/context/UserContext";
import { transactionReducer } from "@/utils/transactionReducer";

const BudgetDoughnutChart = () => {
  const { budgets } = useUser();
  const { budgetUsed, sortedBudgets } = useBudgetFormat(budgets);

  return (
    <div>
      {budgetUsed && <p>{budgetUsed}</p>}
      {sortedBudgets?.map((budget, index) => {
        return (
          <div key={index}>
            <p>{budget.name}</p>
            {budget.transactions && budget.transactions.length > 0 ? (
              <p>
                {transactionReducer(budget.transactions)} / {budget.maxSpend}
              </p>
            ) : (
              <p>0 / {budget.maxSpend}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BudgetDoughnutChart;
