"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import DashboardCardHeader from "../DashboardCardHeader";
import TotalSavedDisplay from "./TotalSavedDisplay";
import PotListPreview from "./PotListPreview";
import { usePotFormat } from "@/hooks/usePotFormat";

const Pots = () => {
  const { pots } = useUser();

  const { totalSaved, sortedPots } = usePotFormat(pots);
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px] md:flex md:justify-around md:flex-col lg:min-w-[25rem] lg:h-full lg:min-h-full">
      <DashboardCardHeader title="Pots" buttonText="See Details" link="pots" />
      <div className="md:flex h-full gap-4">
        <TotalSavedDisplay totalSaved={totalSaved} />
        <PotListPreview sortedPots={sortedPots} />
      </div>
    </div>
  );
};

export default Pots;
