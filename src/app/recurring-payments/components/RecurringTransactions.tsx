"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";

const RecurringTransactions = () => {
  const { recurringPayments } = useUser();
  const transactions = recurringPayments?.map((payment) => {
    return {
      id: payment.id,
      title: payment.title,
      amount: payment.amount,
      dueDate: new Date(payment.dueDate),
      paid: payment.paid,
      frequency: payment.frequency,
    };
  });

  const getDateSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {transactions?.map((transaction) => {
        const day = transaction.dueDate.getDate();
        const formattedDate = `${day}${getDateSuffix(day)}`;
        return (
          <div
            key={transaction.id}
            className="flex justify-between items-center border-b border-greyLight py-2"
          >
            <div className="flex gap-[2px] flex-col w-full">
              <h3 className="font-semibold">{transaction.title}</h3>
              <div className="flex gap-[1px] justify-between w-full">
                <div className="flex gap-[1px] text-[.7rem]">
                  <p>
                    {transaction.frequency.toUpperCase()[0] +
                      transaction.frequency.toLocaleLowerCase().slice(1)}
                  </p>
                  <p>
                    -
                    {isNaN(transaction.dueDate.getTime())
                      ? "Invalid Date"
                      : formattedDate}
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-bold">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecurringTransactions;
