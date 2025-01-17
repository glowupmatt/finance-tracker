"use client";
import { useEffect, useState } from "react";
import { postPot, putPot } from "@/lib/PotsCRUDfunctions";
import { ColorTag, Transaction } from "@prisma/client";
import { usePots } from "@/context/PotsContext";
import { PotType } from "@/types/PotTypes";
import { Budget } from "@/types/BudgetTypes";
import { postBudget, putBudget } from "@/lib/BudgetsCRUDfunctions";
import { useBudgets } from "@/context/BudgetContext";

export const useForm = (
  type?: "POT" | "BUDGET",
  CRUD?: "POST" | "PUT",
  data?: PotType | Budget | undefined
) => {
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [postBody, setPostBody] = useState<PotType | Budget>();
  const { setIsPotsUpdated } = usePots();
  const { setIsBudgetsUpdated } = useBudgets();

  useEffect(() => {
    if (data) {
      if (type === "POT" && "title" in data) {
        setLabel(data.title);
        setValue(data.targetAmount);
        setColor(data.colorTag);
      } else if (type === "BUDGET" && "name" in data) {
        setLabel(data.name);
        setValue(data.maxSpend);
        setColor(data.colorTag);
      }
    }
  }, [setLabel, setValue, data, type]);

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
      post: postBudget,
      put: putBudget,
    },
  };

  useEffect(() => {
    if (CRUD === "PUT" && type === "POT") {
      setPostBody({
        title: label,
        targetAmount: value,
        colorTag: color as ColorTag,
        id: data?.id as string,
        userId: data?.userId as string,
        transactions: data?.transactions as Transaction[],
      });
    }

    if (CRUD === "POST" && type === "POT") {
      setPostBody({
        title: label,
        targetAmount: value,
        colorTag: color as ColorTag,
        id: data?.id as string,
        userId: data?.userId as string,
        transactions: data?.transactions as Transaction[],
      });
    }

    if (CRUD === "PUT" && type === "BUDGET") {
      setPostBody({
        name: label,
        maxSpend: value,
        colorTag: color as ColorTag,
        id: data?.id as string,
        userId: data?.userId as string,
        transactions: data?.transactions as Transaction[],
      });
    }

    if (CRUD === "POST" && type === "BUDGET") {
      setPostBody({
        name: label,
        maxSpend: value,
        colorTag: color as ColorTag,
        id: data?.id as string,
        userId: data?.userId as string,
        transactions: data?.transactions as Transaction[],
      });
    }
  }, [CRUD, type, label, value, color, data]);

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
          await crudFunction[type].post(postBody);
          break;
        case "PUT":
          await crudFunction[type].put(postBody);
          break;
        default:
          console.error("Invalid CRUD operation");
      }
      if (type === "POT") {
        setIsPotsUpdated((prev) => !prev);
      }
      if (type === "BUDGET") {
        setIsBudgetsUpdated((prev) => !prev);
      }
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
