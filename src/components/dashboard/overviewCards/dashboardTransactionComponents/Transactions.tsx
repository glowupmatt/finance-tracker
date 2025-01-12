import React from "react";
import DashboardCardHeader from "../DashboardCardHeader";
import TransactionsData from "./TransactionData";

const Transactions = () => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
      <DashboardCardHeader
        title="Transactions"
        buttonText="View All"
        link="transactions"
      />
      <TransactionsData />
    </div>
  );
};

export default Transactions;
