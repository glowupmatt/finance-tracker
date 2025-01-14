"use client";
import React from "react";
import { Transactions, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useUser } from "@/context/UserContext";
import MobileDataDisplay from "./components/mobileDisplay/MobileDataDisplay";
import LoadingStateHome from "@/components/dashboard/LoadingStateHome";
import { FaMinus, FaMoneyCheckAlt } from "react-icons/fa";
import { TransactionType } from "@prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";

// type Props = {};

const TransactionsDisplay = () => {
  const { transactions } = useUser();

  if (!transactions)
    return (
      <div>
        <LoadingStateHome />
      </div>
    );

  const data: Transactions[] =
    transactions?.map((transaction) => ({
      "Recipient / Sender": {
        image:
          transaction.type === "EXPENSE" ? (
            <FaMinus className="text-white" />
          ) : (
            <FaMoneyCheckAlt className="text-white" />
          ),
        name: transaction.senderOrRecipient || "",
        type: (transaction.type as TransactionType) || "EXPENSE",
      },
      Category: transaction.category || "",
      "Transaction Date": new Date(transaction.date).toLocaleDateString() || "",
      Amount: formatCurrency(transaction.amount) || "",
    })) || [];

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="block md:hidden p-4 w-full">
        <MobileDataDisplay transactions={transactions} />
      </div>
      <div className="hidden md:flex flex-col gap-4 p-8 bg-beigeLight max-h-screen overflow-scroll w-full">
        <h3 className="font-bold text-[2rem]">Transactions</h3>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TransactionsDisplay;
