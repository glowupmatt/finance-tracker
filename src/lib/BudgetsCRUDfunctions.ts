/* eslint-disable @typescript-eslint/no-explicit-any */
import { BudgetType, POSTbudget } from "../types/BudgetTypes";

export async function postBudget(budget: POSTbudget | any | undefined) {
  if (!budget) return;

  return await fetch("/api/budgets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: budget.name,
      maxSpend: Number(budget.maxSpend),
      colorTag: budget.colorTag,
    }),
  });
}

export async function putBudget(budget: POSTbudget | any | undefined) {
  if (!budget) return;
  return await fetch(`/api/budgets/${budget.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: budget.name,
      maxSpend: Number(budget.maxSpend),
      colorTag: budget.colorTag,
    }),
  });
}

export async function deleteBudget(id: string | undefined) {
  if (!id) return;

  return await fetch(`/api/budgets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function postBudgetTransaction(
  budget: BudgetType | undefined,
  transactionAmount: number | undefined,
  title: string | undefined
) {
  if (!budget) return;
  const budgetId = budget.id;
  const name = budget.name;
  const maxSpend = budget.maxSpend;
  const colorTag = budget.colorTag;
  return await fetch(`/api/budgets/${budgetId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: transactionAmount,
      title: title,
      name,
      maxSpend,
      colorTag,
    }),
  });
}
