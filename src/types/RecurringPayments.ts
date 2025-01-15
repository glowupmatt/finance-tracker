import { Transaction } from "@prisma/client";

export type RecurringPaymentType = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  frequency: string;
  transactions: Transaction[];
};
