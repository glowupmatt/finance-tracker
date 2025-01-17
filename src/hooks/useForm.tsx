"use client";
import { useEffect, useState } from "react";
import { postPot, putPot } from "@/lib/PotsCRUDfunctions";
import { ColorTag, Transaction } from "@prisma/client";
import { usePots } from "@/context/PotsContext";
import { PotType } from "@/types/PotTypes";

export const useForm = (
  type?: "POT" | "BUDGET",
  CRUD?: "POST" | "PUT",
  potData?: PotType
) => {
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [color, setColor] = useState<string | undefined>(undefined);
  const { setIsUpdated } = usePots();

  useEffect(() => {
    if (potData) {
      setLabel(potData.title);
      setValue(potData.targetAmount);
      setColor(potData.colorTag);
    }
  }, [potData, setLabel, setValue]);

  function getInputs() {
    return {
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
            React.SetStateAction<string | undefined>
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
    };
  }

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
      if (!type) {
        console.error("Type is undefined");
        return;
      }

      switch (CRUD) {
        case "POST":
          await crudFunction[type].post({
            title: label,
            targetAmount: value as number,
            colorTag: color,
          });
          break;
        case "PUT":
          const body = {
            title: label,
            targetAmount: value as number,
            colorTag: color as ColorTag,
            id: potData?.id as string,
            userId: potData?.userId as string,
            transactions: potData?.transactions as Transaction[],
          };
          await crudFunction[type].put(body);
          break;
        default:
          console.error("Invalid CRUD operation");
      }
      setIsUpdated((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setLabel("");
      setValue(0);
      setColor(undefined);
    }
  }

  return {
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
