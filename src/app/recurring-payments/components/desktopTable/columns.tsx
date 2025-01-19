"use client";

import { $Enums } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionIcons from "../TransactionIcons";
import TransactionMainInfo from "../TransactionMainInfo";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  title: string;
  amount: string;
  dueDate: Date;
  paid: boolean;
  frequency: $Enums.Frequency;
  createdAt?: Date;
  updatedAt?: Date;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: "Bill Title",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <TransactionIcons transaction={transaction} />;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <TransactionMainInfo transaction={transaction} />;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
