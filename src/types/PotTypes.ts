import { $Enums, Transaction } from "@prisma/client";

export type Pot = {
  id: string;
  title: string;
  targetAmount: number;
  colorTag: $Enums.ColorTag;
  userId: string;
  transactions: Transaction[];
};

export type PotType = {
  id: string;
  title: string;
  targetAmount: number;
  userId: string;
  colorTag: $Enums.ColorTag;
  transactions: Transaction[];
};

export type POSTpot = {
  title: string;
  targetAmount: number;
  colorTag: $Enums.ColorTag;
};
