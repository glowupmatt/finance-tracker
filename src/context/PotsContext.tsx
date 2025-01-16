"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Pot } from "@/types/PotTypes";
// import { fetchPots } from "@/lib/PotsCRUDfunctions";

interface PotsContextType {
  pots: Pot[];
  setPots: React.Dispatch<React.SetStateAction<Pot[]>>;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const PotsContext = createContext<PotsContextType | undefined>(undefined);

export const usePots = () => {
  const context = useContext(PotsContext);
  if (!context) {
    throw new Error("usePots must be used within a PotsProvider");
  }
  return context;
};

interface PotsProviderProps {
  children: ReactNode;
}

export const PotsProvider = ({ children }: PotsProviderProps) => {
  const [pots, setPots] = useState<Pot[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPots() {
      try {
        const response = await fetch("/api/pots", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = await response.json();
        if (isMounted) {
          setPots(data.pots);
        }
      } catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }

    fetchPots();

    return () => {
      isMounted = false;
    };
  }, [isUpdated]);

  const contextValue = {
    pots,
    setPots,
    isUpdated,
    setIsUpdated,
  };
  return (
    <PotsContext.Provider value={contextValue}>{children}</PotsContext.Provider>
  );
};
