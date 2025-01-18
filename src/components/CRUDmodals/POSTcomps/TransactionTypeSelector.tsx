import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  setLabel: (value: string) => void;
};

const types = ["Income", "Expense"];

const TransactionTypeSelector = (props: Props) => {
  const { setLabel } = props;
  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionTypeSelector;
