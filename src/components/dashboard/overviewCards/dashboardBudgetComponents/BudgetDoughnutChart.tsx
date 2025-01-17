"use client";
import React from "react";
import BudgetChart from "./BudgetChart";
import SpendingSummary from "./SpendingSummary";
import { formatCurrency } from "@/utils/formatCurrency";
import { BudgetType } from "@/types/BudgetTypes";

type Props = {
  type?: "Dashboard" | "BudgetsPage";
  sortedBudgets?: BudgetType[] | undefined;
};

const BudgetDoughnutChart = ({ type = "Dashboard", sortedBudgets }: Props) => {
  const topFourBudgets = sortedBudgets?.slice(0, 4);
  if (type === "Dashboard") {
    return (
      <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-around">
        <BudgetChart sortedBudgets={sortedBudgets} />
        <SpendingSummary sortedBudgets={topFourBudgets} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-around lg:flex-col">
      <BudgetChart sortedBudgets={sortedBudgets} />
      <div className="flex  flex-col">
        <p className="text-[1.5rem] font-bold py-4 mt-4">Spending Summary</p>
        <div className="lg:grid grid-cols-2 gap-4">
          {topFourBudgets?.map((budget) => (
            <div
              key={budget.id}
              className="flex justify-between items-center py-4 border-b border-greyLight rounded-[1px] lg:w-full"
            >
              <div>
                <div
                  className="w-1 h-[2rem] mr-4 rounded-md"
                  style={{ backgroundColor: budget.colorTag }}
                />
              </div>
              <p className="text-greySemiDark w-full">{budget.name}</p>
              <p className="font-bold text-[.7rem] flex flex-col justify-center items-center">
                {formatCurrency(
                  budget.transactions.reduce((acc, transaction) => {
                    return acc + transaction.amount;
                  }, 0)
                )}{" "}
                <span className="font-thin text-greySemiDark text-[.7rem] text-center">
                  of {formatCurrency(budget.maxSpend)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetDoughnutChart;
