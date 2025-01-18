"use client";
import React from "react";
import SubmitButton from "./SubmitButton";
import { PotType } from "@/types/PotTypes";
import { useForm } from "@/hooks/useForm";
import ColorTagSelector from "./ColorTagSelector";
import BudgetCategorySelector from "./BudgetCategorySelector";
import { Budget } from "@/types/BudgetTypes";
import { TransactionForm } from "@/types/TransactionTypes";
import TransactionTypeSelector from "./TransactionTypeSelector";

type Props = {
  type: "POT" | "BUDGET" | "TRANSACTION";
  CRUD: "POST" | "PUT";
  data?: PotType | Budget | TransactionForm | undefined;
};

const Form = (props: Props) => {
  const { type, CRUD, data } = props;

  const { color, setColor, getInputs, onSubmitHandler } = useForm(
    type,
    CRUD,
    data
  );

  const inputs = getInputs();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderInput = (input: any) => {
    switch (input.label) {
      case "Category":
      case "Budget Category":
        return (
          <BudgetCategorySelector
            setLabel={(value: string) =>
              input.onChange({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
        );
      case "Transaction Type":
        return (
          <TransactionTypeSelector
            setLabel={(value: string) =>
              input.onChange({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
        );

      case "Color Tag":
        return (
          <ColorTagSelector
            type={type}
            CRUD={CRUD}
            color={color}
            setColor={setColor}
            input={input}
          />
        );
      case "Paid":
        return (
          <input
            type={input.type}
            className="border border-greyLight rounded-md p-2 ml-1"
            checked={input.value as boolean}
            onChange={(e) => input.onChange(e)}
          />
        );
      default:
        return (
          <input
            type={input.type}
            className="border border-greyLight rounded-md p-2 ml-1"
            value={(input.value as string | number | undefined) || ""}
            onChange={(e) => input.onChange(e)}
          />
        );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`${
        type === "TRANSACTION"
          ? "grid grid-cols-2 grid-rows-2 gap-4"
          : "flex flex-col gap-4"
      }`}
    >
      {inputs[type].map((input) => (
        <label
          key={input.label}
          className={`flex gap-1 ${
            input.type === "checkbox"
              ? "flex flex-row gap-2 items-center"
              : "flex-col"
          } ${
            input.label === "Transaction Type" || input.label === "Category"
              ? "col-span-2"
              : ""
          }`}
        >
          <p className="text-[.7rem] font-semibold text-greyDark">
            {input.label}
          </p>
          {renderInput(input)}
        </label>
      ))}
      <SubmitButton CRUD={CRUD} type={type} />
    </form>
  );
};

export default Form;
