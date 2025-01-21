"use client";
import React from "react";
import SubmitButton from "./SubmitButton";
import { PotType } from "@/types/PotTypes";
import { useForm } from "@/hooks/useForm";
import { Budget } from "@/types/BudgetTypes";
import { TransactionForm } from "@/types/TransactionTypes";
import { RecurringPaymentType } from "@/types/RecurringPayments";

import DeleteForm from "../DELETEcomps/DeleteForm";
import RenderInput from "./RenderInput";

type Props = {
  type: "POT" | "BUDGET" | "TRANSACTION" | "RECURRING";
  CRUD: "POST" | "PUT";
  data?: PotType | Budget | TransactionForm | RecurringPaymentType | undefined;
};

const Form = (props: Props) => {
  const { type, CRUD, data } = props;

  const { getInputs, onSubmitHandler } = useForm(type, CRUD, data);

  const inputs = getInputs();
  return (
    <>
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
            {(input.label !== "Canceled" && CRUD === "POST") ||
            input.label === "Canceled" ||
            (input.label === "Paid" && CRUD === "PUT") ? (
              <p className="text-[.7rem] font-semibold text-greyDark">
                {input.label}
              </p>
            ) : null}
            <RenderInput input={input} CRUD={CRUD} />
          </label>
        ))}
        <SubmitButton CRUD={CRUD} type={type} />
      </form>
      {(type === "TRANSACTION" || (type === "RECURRING" && CRUD === "PUT")) && (
        <DeleteForm dataId={data?.id} type={type} />
      )}
    </>
  );
};

export default Form;
