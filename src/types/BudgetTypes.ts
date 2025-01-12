import { Transaction } from "@prisma/client";

export type Budget = {
  id: string;
  name: string;
  userId: string;
  maxSpend: number;
  transactions?: Transaction[];
};

export type BudgetType = {
  id: string;
  name: string;
  userId: string;
  maxSpend: number;
  transactions: Transaction[];
  color: string;
};

// export type BudgetType = {
//   id: string;
//   name: string;
//   maxSpend: number;
//   transactions: Transaction[];
//   userId: string;
//   color: string;
// };
