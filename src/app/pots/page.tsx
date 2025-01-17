"use client";
import React from "react";
import PotsCard from "./components/PotsCard";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import { usePots } from "@/context/PotsContext";

function PotsDisplay() {
  const { pots } = usePots();

  const sortedPotsByTimeCreated = pots.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (!sortedPotsByTimeCreated) return <div>Loading...</div>;
  return (
    <section className="min-h-screen">
      <div className="flex item-center justify-between p-4">
        <h2 className="text-2xl font-bold self-center">Pots</h2>
        <DialogPOST type="POT" CRUD="POST" />
      </div>
      <div className="flex flex-col gap-4 p-4 lg:justify-between lg:grid lg:grid-cols-2 lg:gap-4">
        {sortedPotsByTimeCreated.map((pot) => (
          <PotsCard key={pot.id} pot={pot} />
        ))}
      </div>
    </section>
  );
}

export default PotsDisplay;
