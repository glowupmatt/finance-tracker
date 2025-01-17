"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import BudgetDoughnutChart from "@/components/dashboard/overviewCards/dashboardBudgetComponents/BudgetDoughnutChart";
import BudgetData from "./components/BudgetData";
import { useBudgetFormat } from "@/hooks/useBudgetFormat";
import LoadingPage from "@/components/ui/LoadingPage";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import { useBudgets } from "@/context/BudgetContext";

const Budgets = () => {
  const { isLoading } = useUser();
  const { budgets } = useBudgets();
  const { sortedBudgets } = useBudgetFormat(budgets);

  if (isLoading && !budgets) {
    return <LoadingPage />;
  }
  return (
    <section className="superBased:max-h-screen ">
      <div className="flex item-center justify-between p-4">
        <h2 className="text-2xl font-bold self-center">Budgets</h2>
        <DialogPOST type="BUDGET" CRUD="POST" />
      </div>
      <div className="flex flex-col p-4 gap-4 lg:flex-row lg:justify-between lg:gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 lg:w-full lg:max-w-[428px] lg:max-h-[600px] h-full">
          <BudgetDoughnutChart
            type="BudgetsPage"
            sortedBudgets={sortedBudgets}
          />
        </div>
        <div className="lg:w-full  lg:overflow-y-scroll lg:h-screen pb-[4rem]">
          <BudgetData budgets={sortedBudgets} />
        </div>
      </div>
    </section>
  );
};

export default Budgets;
