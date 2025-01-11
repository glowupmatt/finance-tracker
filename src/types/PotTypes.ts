import { Transaction } from "@prisma/client";

export type Pot = {
  id: string;
  title: string;
  targetAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactions: Transaction[];
};

export type PotType = {
  id: string;
  title: string;
  targetAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactions: Transaction[];
  color: string;
};
