"use client";
import React from "react";
import BalanceAndExpenses from "./overviewCards/BalanceAndExpenses";
import { useUser } from "@/context/UserContext";
import LoadingStateHome from "./LoadingStateHome";
import Pots from "./overviewCards/dashboardPotComponents/Pots";
import Transactions from "./overviewCards/dashboardTransactionComponents/Transactions";
import BudgetPreview from "./overviewCards/dashboardBudgetComponents/BudgetPreview";
import RecurringPayments from "./overviewCards/dashboardRecurringPaymentComponents/RecurringPayments";

const DashboardDisplay = () => {
  const { isLoading, user } = useUser();

  console.log(user);
  if (isLoading) {
    return <LoadingStateHome />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 lg:justify-start lg:h-screen overflow-y-auto">
      <h1 className="font-bold text-[1.5rem] w-full items-start">Overview</h1>
      <BalanceAndExpenses />
      <div className="w-full flex flex-col gap-8 lg:flex-row items-start justify-center">
        <div className="w-full flex flex-col items-center justify-center gap-4 lg:gap-8">
          <Pots />
          <Transactions type="Dashboard" />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4 lg:gap-8 lg:h-full">
          <BudgetPreview />
          <RecurringPayments />
        </div>
      </div>
    </div>
  );
};

export default DashboardDisplay;
