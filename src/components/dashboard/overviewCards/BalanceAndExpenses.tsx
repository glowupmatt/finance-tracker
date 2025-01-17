"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { calculateTotal } from "@/utils/calculateTotal";
import { usePots } from "@/context/PotsContext";
import { useTransactions } from "@/context/TransactionsContext";

const BalanceAndExpenses = () => {
  const [currentBalance, setCurrentBalance] = useState<number | undefined>(
    undefined
  );
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [totalExpense, setTotalExpense] = useState<number | undefined>(
    undefined
  );

  const { isPotsUpdated } = usePots();

  const { transactions } = useTransactions();

  useEffect(() => {
    if (transactions !== undefined) {
      const income = calculateTotal(transactions, "INCOME");
      const expense = calculateTotal(transactions, "EXPENSE");
      const savings = calculateTotal(transactions, "SAVINGS");
      if (
        income !== undefined &&
        expense !== undefined &&
        savings !== undefined
      ) {
        setCurrentBalance(income + savings - expense);
      } else {
        setCurrentBalance(undefined);
      }
      setTotalIncome(calculateTotal(transactions, "INCOME"));
      setTotalExpense(calculateTotal(transactions, "EXPENSE"));
    }
  }, [transactions, isPotsUpdated]);

  const details = {
    "Current Balance":
      currentBalance === 0 ? "YOU ARE BROKE" : formatCurrency(currentBalance),
    "Total Income": formatCurrency(totalIncome),
    "Total Expense": formatCurrency(totalExpense),
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:justify-between md:w-full lg:justify-normal">
      {Object.entries(details).map(([key, value], index) => (
        <Card
          key={key}
          className={`w-[90vw] px-4 py-6  md:min-w-[213.33px] md:w-full  ${
            index === 0 ? "bg-greyDark" : null
          }`}
        >
          <CardHeader
            className={`p-0 ${index === 0 ? "text-white" : "text-black"}`}
          >
            <h2>{key}</h2>
          </CardHeader>
          <CardContent
            className={`font-bold text-[2rem] p-0 ${
              index === 0 ? "text-white" : "text-black"
            }`}
          >
            <p>{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BalanceAndExpenses;
