import { Budget } from "@/types/BudgetTypes";
import { useEffect, useState } from "react";
import { BudgetType } from "@/types/BudgetTypes";

export function useBudgetFormat(budgets: Budget[] | undefined) {
  const [budgetUsed, setBudgetUsed] = useState<number | undefined>();
  const [sortedBudgets, setSortedBudgets] = useState<
    BudgetType[] | undefined
  >();

  useEffect(() => {
    if (!budgets) return;

    function getTotalBudget(budgets: Budget[]) {
      const budgetSpend = budgets
        .map(
          (budget) =>
            budget.transactions?.reduce(
              (acc, transaction) => acc + transaction.amount,
              0
            ) || 0
        )
        .reduce((acc, amount) => acc + amount, 0);
      setBudgetUsed(budgetSpend);

      const categories = budgets
        .sort((a, b) => b.maxSpend - a.maxSpend)
        .map((budget) => {
          return {
            id: budget.id,
            name: budget.name,
            maxSpend: budget.maxSpend,
            transactions: budget.transactions || [],
            userId: budget.userId,
            colorTag: budget.colorTag,
          };
        });
      setSortedBudgets(categories);
    }

    getTotalBudget(budgets);
  }, [budgets]);

  return { budgetUsed, sortedBudgets };
}
