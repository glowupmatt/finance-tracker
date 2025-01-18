import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type Props = {
  setLabel: (value: string) => void;
  value?: string;
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
  const { setLabel, value } = props;
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger>
        {selected ? selected : value ? value : "Select Transaction Type"}
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category}
            value={category}
            onClick={() => setSelected(category)}
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BudgetCategorySelector;
