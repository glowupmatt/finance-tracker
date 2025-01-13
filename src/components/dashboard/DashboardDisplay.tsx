import React from "react";
import BalanceAndExpenses from "./overviewCards/BalanceAndExpenses";
import { useUser } from "@/context/UserContext";
import LoadingStateHome from "./LoadingStateHome";
import Pots from "./overviewCards/dashboardPotComponents/Pots";
import Transactions from "./overviewCards/dashboardTransactionComponents/Transactions";
import BudgetPreview from "./overviewCards/dashboardBudgetComponents/BudgetPreview";
import RecurringPayments from "./overviewCards/dashboardRecurringPaymentComponents/RecurringPayments";

const DashboardDisplay = () => {
  const { isLoading } = useUser();

  if (isLoading) {
    return <LoadingStateHome />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-bold text-[1.5rem] w-full items-start">Overview</h1>
      <BalanceAndExpenses />
      <Pots />
      <Transactions />
      <BudgetPreview />
      <RecurringPayments />
    </div>
  );
};

export default DashboardDisplay;
