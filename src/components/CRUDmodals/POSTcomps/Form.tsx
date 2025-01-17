"use client";
import React from "react";
import SubmitButton from "./SubmitButton";
import { PotType } from "@/types/PotTypes";
import { useForm } from "@/hooks/useForm";
import ColorTagSelector from "./ColorTagSelector";
import BudgetCategorySelector from "./BudgetCategorySelector";
import { Budget } from "@/types/BudgetTypes";

type Props = {
  type: "POT" | "BUDGET";
  CRUD: "POST" | "PUT";
  data?: PotType | Budget | undefined;
};

const Form = (props: Props) => {
  const { type, CRUD, data } = props;

  const { color, setColor, getInputs, onSubmitHandler } = useForm(
    type,
    CRUD,
    data
  );

  const inputs = getInputs();

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
      {inputs[type].map((input) => (
        <label key={input.label} className="flex flex-col gap-1">
          <p className="text-[.7rem] font-semibold text-greyDark">
            {input.label}
          </p>
          {input.label === "Budget Category" ? (
            <BudgetCategorySelector
              setLabel={(value: string) => input.setValue(value as string)}
            />
          ) : input.label === "Color Tag" ? (
            <ColorTagSelector
              type={type}
              CRUD={CRUD}
              color={color}
              setColor={setColor}
              input={input}
            />
          ) : (
            <input
              type={input.type}
              className="border border-greyLight rounded-md p-2 ml-1"
              value={input.value || ""}
              onChange={(e) => input.setValue(e.target.value)}
            />
          )}
        </label>
      ))}
      <SubmitButton CRUD={CRUD} type={type} />
    </form>
  );
};

export default Form;
