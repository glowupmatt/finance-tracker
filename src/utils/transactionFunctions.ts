import { Transaction } from "@prisma/client";

export function transactionsSortByDate(transactions: Transaction[]) {
  if (!transactions || transactions.length === 0) return [];
  return transactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function formatTransactionData(transactions: Transaction[]) {
  return transactions.map((transaction) => {
    return {
      ...transaction,
      date: new Date(transaction.date),
    };
  });
}

export const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const monthlyFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "numeric",
});
