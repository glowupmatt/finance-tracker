"use client";
import React from "react";
import PieChart from "./PieChart";
import { BudgetType } from "@/types/BudgetTypes";

type Props = {
  sortedBudgets: BudgetType[] | undefined;
};

function BudgetChart({ sortedBudgets }: Props) {
  return (
    <div className="relative flex items-center justify-center">
      <PieChart sortedBudgets={sortedBudgets} />
    </div>
  );
}

export default BudgetChart;
