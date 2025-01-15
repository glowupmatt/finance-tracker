"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import PotsCard from "./components/PotsCard";
import { usePotFormat } from "@/hooks/usePotFormat";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";

function PotsDisplay() {
  const { pots } = useUser();
  const { sortedPots } = usePotFormat(pots);
  if (!sortedPots) return <div>Loading...</div>;
  return (
    <section>
      <div className="flex item-center justify-between p-4">
        <h2 className="text-2xl font-bold self-center">Pots</h2>
        <DialogPOST type="POT" />
      </div>
      <div className="flex flex-col gap-4 p-4 lg:justify-between lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-y-auto">
        {sortedPots.map((pot) => (
          <PotsCard key={pot.id} pot={pot} />
        ))}
      </div>
    </section>
  );
}

export default PotsDisplay;
