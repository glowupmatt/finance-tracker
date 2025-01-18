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

const ColorTagSelector = ({ setLabel, value }: Props) => {
  const colorOptions = [
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
  ];

  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Select onValueChange={setLabel}>
      <SelectTrigger>
        {selected ? selected : value ? value : "Select Color"}
      </SelectTrigger>
      <SelectContent className="max-h-[20rem] overflow-y-auto">
        {colorOptions.map((color) => (
          <SelectItem
            key={color}
            value={color}
            onClick={() => setSelected(color)}
            className="cursor-pointer"
          >
            {color}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ColorTagSelector;
