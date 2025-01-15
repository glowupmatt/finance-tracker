import { Budget, Transaction, RecurringPayment } from "@prisma/client";
import { Pot } from "@/types/PotTypes";

export type User = {
  transactions: Transaction[] | undefined;
  pots: Pot[] | undefined;
  budgets: Budget[] | undefined;
  recurringPayments: RecurringPayment[] | undefined;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  hashedPassword: string;
};
