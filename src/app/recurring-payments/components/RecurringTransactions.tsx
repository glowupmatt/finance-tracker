"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import TransactionIcons from "./TransactionIcons";
import TransactionMainInfo from "./TransactionMainInfo";

const RecurringTransactions = () => {
  const { recurringPayments } = useUser();
  const transactions = recurringPayments?.map((payment) => {
    return {
      id: payment.id,
      title: payment.title,
      amount: payment.amount.toString(),
      dueDate: new Date(payment.dueDate),
      paid: payment.paid,
      frequency: payment.frequency,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 lg:w-full">
      {transactions?.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="flex justify-between items-center border-b border-greyLight py-2"
          >
            <div className="flex gap-[2px] flex-col w-full">
              <TransactionIcons transaction={transaction} />
              <TransactionMainInfo transaction={transaction} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecurringTransactions;
