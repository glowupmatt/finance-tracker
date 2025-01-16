"use client";
import React from "react";
import PotsCard from "./components/PotsCard";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import { usePots } from "@/context/PotsContext";

function PotsDisplay() {
  const { pots } = usePots();

  if (!pots) return <div>Loading...</div>;

  const sortedPots = pots.sort((a, b) => {
    const totalA = a.transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const totalB = b.transactions.reduce((acc, curr) => acc + curr.amount, 0);
    return totalB - totalA;
  });

  return (
    <section className="overflow-y-scroll max-h-screen">
      <div className="flex item-center justify-between p-4">
        <h2 className="text-2xl font-bold self-center">Pots</h2>
        <DialogPOST type="POT" CRUD="POST" />
      </div>
      <div className="flex flex-col gap-4 p-4 lg:justify-between lg:grid lg:grid-cols-2 lg:gap-4">
        {sortedPots.map((pot) => (
          <PotsCard key={pot.id} pot={pot} />
        ))}
      </div>
    </section>
  );
}

export default PotsDisplay;
