import { $Enums } from "@prisma/client";

export type TransactionForm = {
  title: string;
  amount: number;
  type: $Enums.TransactionType;
  isPaid: boolean;
  category: string;
  senderOrRecipient: string;
};
