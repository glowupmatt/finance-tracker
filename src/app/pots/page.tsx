"use client";
import React from "react";
import PotsCard from "./components/PotsCard";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";
import { usePots } from "@/context/PotsContext";
import { usePotFormat } from "@/hooks/usePotFormat";
import LoadingPage from "@/components/ui/LoadingPage";

function PotsDisplay() {
  const { pots } = usePots();

  const { sortedPots } = usePotFormat(pots);

  if (!sortedPots) return <LoadingPage />;
  return (
    <section className="min-h-screen lg:max-h-screen overflow-y-auto">
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
