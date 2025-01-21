"use client";
import React from "react";
import { Transactions, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import MobileDataDisplay from "./components/mobileDisplay/MobileDataDisplay";
import { FaMinus, FaMoneyCheckAlt } from "react-icons/fa";
import { TransactionType } from "@prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";

import { useTransactions } from "@/context/TransactionsContext";
import LoadingPage from "@/components/ui/LoadingPage";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import SearchBar from "./components/SearchBar";

const TransactionsDisplay = () => {
  const { transactionPagination } = useTransactions();
  if (!transactionPagination) return <LoadingPage />;

  const data: Transactions[] =
    transactionPagination?.map((transaction) => {
      const isRed =
        transaction.amount.toString().includes("-") ||
        transaction.type === "EXPENSE";

      const isGreen = transaction.type === "INCOME" || transaction.amount > 0;

      return {
        Transaction: {
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
          category: transaction.category || "",
          id: transaction.id || "",
          isPaid: transaction.isPaid || false,
          senderOrRecipient: transaction.senderOrRecipient || "",
          title: transaction.title || "",
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
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[2rem]">Transactions</h3>
          <DialogPOST CRUD="POST" type="TRANSACTION" />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TransactionsDisplay;
