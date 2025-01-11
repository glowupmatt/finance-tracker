import React from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";

const BalanceAndExpenses = () => {
  const { totalIncome, totalExpense, currentBalance } = useUser();

  const details = {
    "Current Balance":
      currentBalance === 0 ? "YOU ARE BROKE" : formatCurrency(currentBalance),
    "Total Income": formatCurrency(totalIncome),
    "Total Expense": formatCurrency(totalExpense),
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {Object.entries(details).map(([key, value], index) => (
        <Card
          key={key}
          className={`w-[90vw] px-4 py-6 ${index === 0 ? "bg-greyDark" : null}`}
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
