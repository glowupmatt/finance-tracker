import { $Enums, Transaction } from "@prisma/client";

export type RecurringPaymentType = {
  id?: string;
  title: string;
  amount: number;
  dueDate: Date;
  paid: boolean;
  cancelled?: boolean;
  createdAt: Date;
  frequency: $Enums.Frequency;
  transactions?: Transaction[];
};
