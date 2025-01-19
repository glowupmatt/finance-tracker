"use client";

import React from "react";
import TotalBillsCard from "./components/TotalBillsCard";
import SummaryCard from "./components/SummaryCard";
import RecurringTransactions from "./components/RecurringTransactions";
import { DataTable } from "./components/desktopTable/data-table";
import { columns, Transaction } from "./components/desktopTable/columns";
import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { Frequency } from "@prisma/client";
import LoadingPage from "@/components/ui/LoadingPage";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";

const RecurringPayments = () => {
  const { recurringPayments } = useUser();
  if (!recurringPayments) return <LoadingPage />;

  const data: Transaction[] =
    recurringPayments
      ?.map((transaction) => ({
        id: transaction.id || "",
        title: transaction.title || "",
        amount: formatCurrency(transaction.amount),
        dueDate: new Date(transaction.dueDate) || new Date(),
        createdAt: new Date(transaction.createdAt) || new Date(),
        paid: transaction.paid || false,
        frequency: (transaction.frequency as Frequency) || "MONTHLY",
      }))
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }) || [];

  return (
    <div className="p-4 lg:max-h-screen overflow-y-scroll lg:min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[2rem] mb-4">Recurring Bills</h2>
        <DialogPOST CRUD="POST" type="RECURRING" />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:w-full lg:flex-col">
          <TotalBillsCard />
          <SummaryCard />
        </div>
        <div className="lg:hidden">
          <RecurringTransactions />
        </div>
        <div className="hidden lg:block w-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default RecurringPayments;
