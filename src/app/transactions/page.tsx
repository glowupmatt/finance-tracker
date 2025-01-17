"use client";
import React from "react";
import { Transactions, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useUser } from "@/context/UserContext";
import MobileDataDisplay from "./components/mobileDisplay/MobileDataDisplay";
import { FaMinus, FaMoneyCheckAlt } from "react-icons/fa";
import { TransactionType } from "@prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import LoadingState from "@/components/ui/loadingState";
import { useTransactions } from "@/context/TransactionsContext";

const TransactionsDisplay = () => {
  const { transactions } = useUser();
  const { transactionPagination } = useTransactions();

  if (!transactions)
    return (
      <div className="flex justify-center items-center w-screen min-h-screen">
        <LoadingState />
      </div>
    );

  const data: Transactions[] =
    transactionPagination?.map((transaction) => {
      const isRed =
        transaction.amount.toString().includes("-") ||
        transaction.type === "EXPENSE";

      const isGreen = transaction.type === "INCOME" || transaction.amount > 0;

      return {
        "Recipient / Sender": {
          image: isRed ? (
            <FaMinus className="text-white" />
          ) : isGreen ? (
            <FaMoneyCheckAlt className="text-white" />
          ) : (
            <div></div>
          ),
          name: transaction.senderOrRecipient || transaction.title || "",
          type: (transaction.type as TransactionType) || "EXPENSE",
          amount: transaction.amount || 0,
        },
        Category: transaction.category || "",
        "Transaction Date":
          new Date(transaction.date).toLocaleDateString() || "",
        Amount: formatCurrency(transaction.amount) || "",
      };
    }) || [];

  return (
    <div className="flex justify-center items-center w-screen lg:w-full">
      <div className="block md:hidden p-4 w-full">
        <MobileDataDisplay transactions={transactionPagination} />
      </div>
      <div className="hidden md:flex flex-col gap-4 p-8 bg-beigeLight min-h-screen w-full overflow-scroll max-h-screen">
        <h3 className="font-bold text-[2rem]">Transactions</h3>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TransactionsDisplay;
