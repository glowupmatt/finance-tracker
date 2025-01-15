"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import BudgetDoughnutChart from "./BudgetDoughnutChart";
import DashboardCardHeader from "../DashboardCardHeader";
import { useBudgetFormat } from "@/hooks/useBudgetFormat";

const BudgetPreview = () => {
  const { budgets } = useUser();
  const { sortedBudgets } = useBudgetFormat(budgets);
  if (!budgets) return null;

  return (
    <div className="bg-white w-full p-4 rounded-lg shadow-md min-h-[324px] lg:flex lg:flex-col lg:justify-around lg:h-full">
      <DashboardCardHeader
        title="Budgets"
        buttonText="See Details"
        link="budgets"
      />
      <BudgetDoughnutChart sortedBudgets={sortedBudgets} />
    </div>
  );
};

export default BudgetPreview;
