"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import BudgetDoughnutChart from "./BudgetDoughnutChart";

const BudgetPreview = () => {
  const { budgets } = useUser();
  if (!budgets) return null;

  return (
    <div>
      <BudgetDoughnutChart />
    </div>
  );
};

export default BudgetPreview;
