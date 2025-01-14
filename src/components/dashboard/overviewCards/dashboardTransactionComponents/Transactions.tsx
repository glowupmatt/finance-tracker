import React from "react";
import DashboardCardHeader from "../DashboardCardHeader";
import TransactionsData from "./TransactionData";

type Props = {
  type: "MainPage" | "Dashboard";
};

const Transactions = ({ type }: Props) => {
  if (type === "MainPage") {
    return (
      <section className="w-full flex flex-col gap-8">
        <h3 className="font-bold text-[2rem]">Transactions</h3>
        <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
          <TransactionsData type={type} />
        </div>
      </section>
    );
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
      <DashboardCardHeader
        title="Transactions"
        buttonText="View All"
        link="transactions"
      />
      <TransactionsData type={type} />
    </div>
  );
};

export default Transactions;
