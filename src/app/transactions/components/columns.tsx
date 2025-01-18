"use client";

import { TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { JSX } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transactions = {
  Transaction: {
    id: string;
    title: string;
    isPaid: boolean;
    category: string;
    senderOrRecipient: string;
    image: JSX.Element;
    name: string;
    type: TransactionType;
    amount: number;
  };
  Category: string;
  "Transaction Date": string;
  Amount: string;
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "Transaction",
    header: "Transaction",
    cell: ({ getValue }) => {
      const value = getValue() as {
        image: React.JSX.Element;
        name: string;
        type: TransactionType;
        amount: number;
      };

      const isRed = value.amount < 0 || value.type === "EXPENSE";

      const isGreen = value.type === "INCOME" || value.amount > 0;
      return (
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 ${
              value.type === "EXPENSE" || isRed
                ? "bg-[#C94736]"
                : isGreen
                ? "bg-[#277C78]"
                : ""
            } rounded-full`}
          >
            {value.image}
          </div>
          <span>{value.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "Transaction Date",
    header: "Transaction Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as Date);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return formatter.format(date);
    },
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
];
