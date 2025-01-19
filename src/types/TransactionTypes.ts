import { $Enums } from "@prisma/client";

export type TransactionForm = {
  id?: string;
  title: string;
  amount: number;
  type: $Enums.TransactionType;
  isPaid: boolean;
  category: string;
  senderOrRecipient: string;
};

export type TransactionType = {
  id: string;
  title: string;
  amount: number;
  type: $Enums.TransactionType;
  isPaid: boolean;
  category: string;
  senderOrRecipient: string;
};
