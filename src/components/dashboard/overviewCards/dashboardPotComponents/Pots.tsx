"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import DashboardCardHeader from "../DashboardCardHeader";
import TotalSavedDisplay from "./TotalSavedDisplay";
import SpotListPreview from "./SpotListPreview";
import { usePotFormat } from "@/hooks/usePotFormat";

const Pots = () => {
  const { pots } = useUser();

  const { totalSaved, sortedPots } = usePotFormat(pots);
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
      <DashboardCardHeader title="Pots" buttonText="See Details" link="pots" />
      <TotalSavedDisplay totalSaved={totalSaved} />
      <div>
        <SpotListPreview sortedPots={sortedPots} />
      </div>
    </div>
  );
};

export default Pots;
