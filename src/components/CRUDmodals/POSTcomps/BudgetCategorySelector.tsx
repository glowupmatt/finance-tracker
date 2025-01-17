import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  setLabel: (value: string) => void;
};

const categories = [
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
];

const BudgetCategorySelector = (props: Props) => {
  const { setLabel } = props;
  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BudgetCategorySelector;
