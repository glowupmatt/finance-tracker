"use client";
import React, { useState, useContext, createContext, useEffect } from "react";
import { User } from "@/types/UserTypes";
import { RecurringPayment } from "@prisma/client";
import { useFetchForDashboard } from "@/hooks/useFetchForDashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserActions } from "@/lib/fetchUserActions";

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  recurringPayments: RecurringPayment[] | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const UserProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  const { recurringPayments, isUserUpdated } = useFetchForDashboard(user);

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    } else {
      if (status === "authenticated") {
        setIsLoading(true);
        fetchUserActions(session.user?.email as string)
          .then((data) => {
            setUser(data?.user);
          })
          .catch((error) => {
            console.error("Error fetching user actions:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [router, status, session, isUserUpdated]);

  const data = {
    recurringPayments,
    isLoading,
    user,
    setUser,
    setIsLoading,
    isOpen,
    setIsOpen,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
