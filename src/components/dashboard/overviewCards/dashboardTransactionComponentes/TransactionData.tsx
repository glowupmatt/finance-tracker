/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import {
  transactionsSortByDate,
  formatTransactionData,
} from "@/utils/transactionFunctions";
import TransactionPriceAndDate from "./TransactionPriceAndDate";
import TransactionDetails from "./TransactionDetails";

const TransactionData = () => {
  const { transactions } = useUser();
  if (!transactions)
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <p>No Current Transactions to display</p>
      </div>
    );

  const sortedTransactions = transactionsSortByDate(transactions);
  const formattedTransactions = formatTransactionData(
    sortedTransactions
  ).filter((_, index) => index < 5);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {formattedTransactions.map((transaction, index) => {
        return (
          <div
            key={index}
            className={`flex justify-between py-4 ${
              index === 4 ? "" : "border-b border-beigeDark"
            }`}
          >
            <TransactionDetails transaction={transaction} />
            <TransactionPriceAndDate transaction={transaction} />
          </div>
        );
      })}
    </div>
  );
};

export default TransactionData;
