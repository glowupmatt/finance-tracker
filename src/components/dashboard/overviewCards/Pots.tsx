"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { Pot } from "@/types/PotTypes";
import { Transaction } from "@prisma/client";
import { formatCurrency } from "@/lib/formatCurrency";
import ButtonTertiary from "@/components/ui/ButtonTertiary";
import generateRandomColor from "@/lib/randomColorGenerator";

type PotType = {
  id: string;
  title: string;
  targetAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactions: Transaction[];
  color: string;
};
const Pots = () => {
  const { pots } = useUser();
  const [totalSaved, setTotalSaved] = useState<string | null>(null);
  const [sortedPots, setSortedPots] = useState<PotType[] | undefined>([]);

  useEffect(() => {
    function getTotalSaved(pots: Pot[]) {
      const transactions = pots.map((pot) => pot.transactions);
      const total = transactions.reduce((acc, transaction) => {
        return (
          acc + transaction.reduce((acc, transaction) => transaction.amount, 0)
        );
      }, 0);
      setTotalSaved(formatCurrency(total));

      const categories = pots
        .sort((a, b) => {
          const totalA = a.transactions.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          );
          const totalB = b.transactions.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          );
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

    if (!pots) return;

    getTotalSaved(pots);
  }, [pots]);

  console.log(sortedPots, " sortedPots");

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[1.4rem] font-bold">Pots</h2>
        <ButtonTertiary>See Details</ButtonTertiary>
      </div>
      <div className="flex justify-start gap-[2rem] items-center w-full mt-4 bg-beigeLight p-4 rounded-lg">
        <img
          src="/images/icon-pot.svg"
          alt="pot icon"
          className="w-[40px] h-[40px]"
        />
        <div className="flex flex-col gap-3 justify-between items-start">
          <p className="text-greySemiDark">Total Saved</p>
          <p className="text-black text-[3rem] font-bold">{totalSaved}</p>
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-2 gap-2 mt-4">
          {sortedPots?.map((pot, index) => (
            <li
              key={index}
              className="text-greySemiDark flex items-center flex-row gap-2"
            >
              <div
                className={`w-full max-w-[4px] h-[43px] border-none rounded-lg`}
                style={{ backgroundColor: pot.color }}
              />
              <p>{pot.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pots;
