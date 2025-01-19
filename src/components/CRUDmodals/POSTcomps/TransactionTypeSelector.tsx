"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React, { useState } from "react";

type Props = {
  setLabel: (value: string) => void;
  value?: string;
};

const types = ["Income", "Expense"];

const TransactionTypeSelector = (props: Props) => {
  const { setLabel, value } = props;
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger>
        {selected ? selected : value ? value : "Select Transaction Type"}
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type} value={type} onClick={() => setSelected(type)}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionTypeSelector;
