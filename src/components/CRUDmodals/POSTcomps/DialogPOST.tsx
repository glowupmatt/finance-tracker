"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useForm } from "@/hooks/useForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PotType } from "@/types/PotTypes";
// import { BudgetType } from "@/types/BudgetTypes";
import DialogTriggerCondition from "./DialogTriggerCondition";
import SubmitButton from "./SubmitButton";

type Props = {
  type: "POT" | "BUDGET";
  CRUD: "POST" | "PUT" | "DELETE";
  potData?: PotType;
};

const DialogPOST = ({ type, CRUD, potData }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pageData = {
    POT: ["Add New Pot", "Create a new Pot (Savings, Emergency, etc.)"],
    BUDGET: ["Add New Budget", "Create a new Budget (Groceries, Rent, etc.)"],
  };

  const {
    colorOptions,
    getInputs,
    setLabel,
    setValue,
    setColor,
    onSubmitHandler,
  } = useForm(type, CRUD, setIsDialogOpen, potData);

  const inputs = getInputs();

  useEffect(() => {
    if (potData) {
      setLabel(potData.title);
      setValue(potData.targetAmount);
      setColor(potData.colorTag);
    }
  }, [potData, setColor, setLabel, setValue]);

  return (
    <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
      <DialogTriggerCondition type={type} CRUD={CRUD} />
      <DialogContent className="bg-white p-4 rounded-md max-w-[335px]">
        <DialogHeader>
          <DialogTitle>{pageData[type][0]}</DialogTitle>
          <DialogDescription className="mt-[2rem]">
            {pageData[type][1]}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {inputs[type].map((input) => (
            <label key={input.label} className="flex flex-col gap-1">
              <p className="text-[.7rem] font-semibold text-greyDark">
                {input.label}
              </p>
              {input.label === "Color Tag" ? (
                <Select
                  value={input.value as string}
                  onValueChange={(value) => input.setValue(value)}
                >
                  <SelectTrigger>
                    <SelectValue>{input.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[20rem] overflow-y-auto">
                    {colorOptions.map((color) => (
                      <SelectItem
                        key={color}
                        value={color}
                        className="cursor-pointer"
                      >
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <input
                  type={input.type}
                  className="border border-greyLight rounded-md p-2 ml-1"
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
              )}
            </label>
          ))}
          <SubmitButton CRUD={CRUD} type={type} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPOST;
