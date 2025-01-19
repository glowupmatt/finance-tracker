"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React, { useState } from "react";

type Props = {
  dataType:
    | "colorOptions"
    | "categoriesOptions"
    | "frequencyOptions"
    | "transactionTypeOptions";
  setLabel: (value: string) => void;
  value?: string;
};

const options = {
  colorOptions: [
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
  ],
  categoriesOptions: [
    "Groceries",
    "Rent",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Health",
    "Insurance",
    "Education",
    "Savings",
    "Emergency",
    "Personal",
    "Other",
  ],
  frequencyOptions: ["Daily", "Weekly", "Bi-Weekly", "Monthly", "Yearly"],
  transactionTypeOptions: ["Income", "Expense"],
};

const getPlaceholderText = (dataType: string) => {
  switch (dataType) {
    case "colorOptions":
      return "Select Color";
    case "categoriesOptions":
      return "Select Category";
    case "frequencyOptions":
      return "Select Frequency";
    case "transactionTypeOptions":
      return "Select Transaction Type";
    default:
      return "Select Option";
  }
};

const Selectors = (props: Props) => {
  const { setLabel, dataType, value } = props;
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger>
        {selected ?? value ?? getPlaceholderText(dataType)}
      </SelectTrigger>
      <SelectContent className="max-h-[20rem] overflow-y-auto">
        {options[dataType].map((option) => (
          <SelectItem
            key={option}
            value={option}
            onClick={() => setSelected(option)}
            className="cursor-pointer"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selectors;
