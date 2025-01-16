"use client";
import { useState, useEffect } from "react";
import { Pot } from "@/types/PotTypes";
import { fetchPots } from "@/lib/PotsCRUDfunctions";

interface UseUpdatePotDisplayReturn {
  pots: Pot[];
}

const useUpdatePotDisplay = (isUpdated: boolean): UseUpdatePotDisplayReturn => {
  const [pots, setPots] = useState([]);

  useEffect(() => {
    const fetchPotsData = async () => {
      try {
        const data = await fetchPots();
        setPots(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPotsData();
  }, [isUpdated]);

  return { pots };
};

export { useUpdatePotDisplay };
