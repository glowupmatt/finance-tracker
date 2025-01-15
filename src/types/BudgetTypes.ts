import { $Enums, Transaction } from "@prisma/client";

export type Budget = {
  id: string;
  name: string;
  userId: string;
  maxSpend: number;
  colorTag: $Enums.ColorTag;
  transactions?: Transaction[];
};

export type BudgetType = {
  id: string;
  name: string;
  userId: string;
  maxSpend: number;
  colorTag: $Enums.ColorTag;
  transactions: Transaction[];
};

// export type BudgetType = {
//   id: string;
//   name: string;
//   maxSpend: number;
//   transactions: Transaction[];
//   userId: string;
//   color: string;
// };
