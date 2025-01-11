"use client";
import React from "react";
import { useUser } from "@/app/context/UserContext";
import DashboardPotHeader from "./potComponents/dashboardPotComponents/DashboardPotHeader";
import TotalSavedDisplay from "./potComponents/dashboardPotComponents/TotalSavedDisplay";
import SpotListPreview from "./potComponents/dashboardPotComponents/SpotListPreview";
import { usePotFormat } from "@/hooks/usePotFormat";

const Pots = () => {
  const { pots } = useUser();

  const { totalSaved, sortedPots } = usePotFormat(pots);
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md min-h-[324px]">
      <DashboardPotHeader />
      <TotalSavedDisplay totalSaved={totalSaved} />
      <div>
        <SpotListPreview sortedPots={sortedPots} />
      </div>
    </div>
  );
};

export default Pots;
