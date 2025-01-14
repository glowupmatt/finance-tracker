import React from "react";
import TotalBillsCard from "./components/TotalBillsCard";
import SummaryCard from "./components/SummaryCard";
import RecurringTransactions from "./components/RecurringTransactions";

const RecurringPayments = () => {
  return (
    <div className="p-4">
      <h2 className="font-bold text-[2rem] mb-4">Transactions</h2>
      <div className="flex flex-col gap-4">
        <TotalBillsCard />
        <SummaryCard />
        <RecurringTransactions />
      </div>
    </div>
  );
};

export default RecurringPayments;
