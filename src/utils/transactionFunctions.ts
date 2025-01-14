import { Transaction } from "@prisma/client";

export function transactionsSortByDate(transactions: Transaction[]) {
  return transactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function formatTransactionData(transactions: Transaction[]) {
  // const formatter = new Intl.DateTimeFormat("en-GB", {
  //   day: "2-digit",
  //   month: "short",
  //   year: "numeric",
  // });

  return transactions.map((transaction) => {
    return {
      ...transaction,
      date: new Date(transaction.date),
    };
  });
}
