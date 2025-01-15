"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import BudgetDoughnutChart from "@/components/dashboard/overviewCards/dashboardBudgetComponents/BudgetDoughnutChart";
import BudgetData from "./components/BudgetData";
import { useBudgetFormat } from "@/hooks/useBudgetFormat";

const Budgets = () => {
  const { isLoading, budgets } = useUser();
  const { sortedBudgets } = useBudgetFormat(budgets);

  if (isLoading && !budgets) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-y-scroll flex flex-col p-4 gap-4 lg:flex-row lg:justify-between lg:gap-4 max-h-screen lg:overflow-y-hidden">
      <div className="bg-white rounded-lg shadow-md p-4 lg:w-full lg:max-h-[600px] ">
        <BudgetDoughnutChart type="BudgetsPage" sortedBudgets={sortedBudgets} />
      </div>
      <div className="lg:w-full">
        <BudgetData budgets={sortedBudgets} />
      </div>
    </div>
  );
};

export default Budgets;
