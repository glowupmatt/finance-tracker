/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { useUser } from "@/context/UserContext";
import { useBudgetFormat } from "@/hooks/useBudgetFormat";
import { Transaction } from "@prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { BudgetType } from "@/types/BudgetTypes";

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  sortedBudgets: BudgetType[] | undefined;
};

function PieChart({ sortedBudgets }: Props) {
  const { budgets } = useUser();
  const { budgetUsed } = useBudgetFormat(budgets);

  const getTotalBudget = () => {
    return sortedBudgets?.reduce((acc, budget) => acc + budget.maxSpend, 0);
  };

  const chartData: any = {
    labels: sortedBudgets?.map((budget) => budget.name) || [],
    datasets: [
      {
        label: "Budget",
        data:
          sortedBudgets?.map((budget) => {
            return (
              budget.transactions?.reduce(
                (acc: number, transaction: Transaction) =>
                  acc + transaction.amount,
                0
              ) || 0
            );
          }) || [],

        backgroundColor: sortedBudgets?.map((budget) => budget.color) || [],
        borderAlign: "inner",
        borderRadius: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    aspectRatio: 1,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-[500px] max-h-[500px] mx-auto">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center h-full w-full  justify-center gap-3 leading-none mt-[.7rem]">
        <p className="font-bold text-[32px]">{formatCurrency(budgetUsed, 0)}</p>
        <p className="text-greyLight">
          of {formatCurrency(getTotalBudget(), 0)} limit
        </p>
      </div>
    </div>
  );
}

export default PieChart;
