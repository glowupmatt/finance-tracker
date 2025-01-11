"use client";
import { useEffect, useState } from "react";
import { Pot, PotType } from "@/types/PotTypes";
import { transactionReducer } from "@/utils/transactionReducer";
import { formatCurrency } from "@/utils/formatCurrency";
import generateRandomColor from "@/utils/randomColorGenerator";

const usePotFormat = (pots: Pot[] | undefined) => {
  const [totalSaved, setTotalSaved] = useState<string | null>(null);
  const [sortedPots, setSortedPots] = useState<PotType[] | undefined>([]);

  useEffect(() => {
    function getTotalSaved(pots: Pot[] | undefined) {
      if (!pots) return;
      const transactions = pots?.map((pot) => pot.transactions);
      const total = transactionReducer(transactions.flat());
      setTotalSaved(formatCurrency(total));

      const categories = pots
        .sort((a, b) => {
          const totalA = transactionReducer(a.transactions.flat());
          const totalB = transactionReducer(b.transactions.flat());
          return totalB - totalA;
        })
        .map((pot) => {
          return {
            id: pot.id,
            title: pot.title,
            targetAmount: pot.targetAmount,
            createdAt: pot.createdAt,
            updatedAt: pot.updatedAt,
            userId: pot.userId,
            transactions: pot.transactions,
            color: generateRandomColor(),
          };
        });
      setSortedPots(categories);
    }

    getTotalSaved(pots);
  }, [pots]);

  return { totalSaved, sortedPots };
};

export { usePotFormat };
