"use client";

import React from "react";
import DashboardCardHeader from "../DashboardCardHeader";
import TransactionsData from "./TransactionData";
import { useTransactions } from "@/context/TransactionsContext";
import PaginationComp from "@/app/transactions/components/PaginationComp";

type Props = {
  type: "MainPage" | "Dashboard";
};

const Transactions = ({ type }: Props) => {
  const { totalPages, setPage } = useTransactions();

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (type === "MainPage") {
    return (
      <section className="w-full flex flex-col gap-8">
        <h3 className="font-bold text-[2rem]">Transactions</h3>
        <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
          <TransactionsData type={type} />
          <PaginationComp
            transactionPages={totalPages}
            onPageChange={onPageChange}
          />
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
