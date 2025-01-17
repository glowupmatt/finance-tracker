"use client";
import React from "react";

import { transactionsSortByDate } from "@/utils/transactionFunctions";
import TransactionPriceAndDate from "./TransactionPriceAndDate";
import TransactionDetails from "./TransactionDetails";
import { useTransactions } from "@/context/TransactionsContext";

type Props = {
  type: "MainPage" | "Dashboard";
};
const TransactionData = ({ type = "Dashboard" }: Props) => {
  const { transactionPagination } = useTransactions();
  if (!transactionPagination)
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <p>No Current Transactions to display</p>
      </div>
    );

  const sortedTransactions = transactionsSortByDate(transactionPagination);
  const formattedTransactions = sortedTransactions.filter(
    (_, index) => index < 5
  );

  const checkType =
    type === "Dashboard" ? formattedTransactions : sortedTransactions;

  if (type === "MainPage") {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        {checkType.map((transaction, index) => {
          return (
            <div
              key={index}
              className={`flex justify-between py-4 border-b border-beigeDark`}
            >
              <TransactionDetails transaction={transaction} type={type} />
              <TransactionPriceAndDate transaction={transaction} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {checkType.map((transaction, index) => {
        return (
          <div
            key={index}
            className={`flex justify-between py-4 ${
              index === 4 ? "" : "border-b border-beigeDark"
            }`}
          >
            <TransactionDetails transaction={transaction} type={type} />
            <TransactionPriceAndDate transaction={transaction} />
          </div>
        );
      })}
    </div>
  );
};

export default TransactionData;
