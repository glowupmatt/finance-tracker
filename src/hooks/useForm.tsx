"use client";

import { useState } from "react";
import { postPot, putPot } from "@/lib/PotsCRUDfunctions";
import { $Enums, Transaction } from "@prisma/client";
import { usePots } from "@/context/PotsContext";
import { PotType } from "@/types/PotTypes";

export const colorOptions = [
  "GREEN",
  "YELLOW",
  "CYAN",
  "NAVY",
  "RED",
  "PURPLE",
  "TURQUOISE",
  "BROWN",
  "MAGENTA",
  "BLUE",
  "GREY",
  "ARMY",
  "ORANGE",
];

export const useForm = (
  type: "POT" | "BUDGET",
  CRUD: "POST" | "PUT" | "DELETE",
  setIsDialogOpen: (isOpen: boolean) => void,
  potData?: PotType
) => {
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [color, setColor] = useState<$Enums.ColorTag | undefined>(undefined);
  const { setIsUpdated } = usePots();

  const getInputs = () => ({
    POT: [
      {
        label: "Pot Name",
        type: "text",
        value: label,
        setValue: setLabel as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Target",
        type: "number",
        value: value,
        setValue: setValue as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Color Tag",
        type: "text",
        value: color || "",
        setValue: setColor as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
    ],
    BUDGET: [
      {
        label: "Budget Category",
        type: "text",
        value: label,
        setValue: setLabel as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Maximum Spending",
        type: "number",
        value: value,
        setValue: setValue as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Color Tag",
        type: "text",
        value: color || "",
        setValue: setColor as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
    ],
  });

  const crudFunction = {
    POT: {
      post: postPot,
      put: putPot,
    },
    BUDGET: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      post: function (budget: any) {
        console.log(budget);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      put: function (budget: any) {
        console.log(budget);
      },
    },
  };

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!color) return alert("Please enter a color tag");

    try {
      if (CRUD === "POST") {
        await crudFunction[type].post({
          title: label,
          targetAmount: value as number,
          colorTag: color,
        });
      } else if (CRUD === "PUT") {
        await crudFunction[type].put({
          title: label,
          targetAmount: value as number,
          colorTag: color,
          id: potData?.id as string,
          userId: potData?.userId as string,
          transactions: potData?.transactions as Transaction[],
        });
      }
      setIsUpdated((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setLabel("");
      setValue(0);
      setColor(undefined);
      setIsDialogOpen(false);
    }
  }

  return {
    colorOptions,
    getInputs,
    crudFunction,
    label,
    setLabel,
    value,
    setValue,
    color,
    setColor,
    onSubmitHandler,
  };
};
