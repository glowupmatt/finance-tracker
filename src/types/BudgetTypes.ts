import { $Enums, Transaction } from "@prisma/client";

export type Budget = {
  id: string;
  name: string;
  userId: string;
  maxSpend: number;
  colorTag: $Enums.ColorTag;
  transactions?: Transaction[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type BudgetType = {
  id: string;
  name: string;
  userId: string;
  maxSpend: number;
  colorTag: $Enums.ColorTag;
  transactions: Transaction[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type POSTbudget = {
  name: string;
  maxSpend: number;
  colorTag: $Enums.ColorTag;
};
