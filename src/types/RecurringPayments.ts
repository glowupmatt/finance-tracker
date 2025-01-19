import { $Enums, Transaction } from "@prisma/client";

export type RecurringPaymentType = {
  id?: string;
  title: string;
  amount: number;
  dueDate: Date;
  paid: boolean;
  cancelled?: boolean;
  frequency: $Enums.Frequency;
  transactions?: Transaction[];
};
