import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateColorToHex } from "@/utils/translateColorToHex";
import { ColorTag } from "@prisma/client";
import { PotType } from "@/types/PotTypes";
import React from "react";

type Props = {
  type: "POT" | "BUDGET" | "TRANSACTION";
  CRUD: "POST" | "PUT";
  potData?: PotType | undefined;
  color: string | undefined;
  setColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  input: {
    value: number | string | boolean | undefined;
    label: string;
    type: string;
    checked?: boolean;
  };
};

const ColorTagSelector = ({ potData, color, setColor, input }: Props) => {
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
  return (
    <Select
      value={input.value as string}
      onValueChange={(value) => {
        setColor(value as ColorTag);
      }}
    >
      <SelectTrigger>
        <SelectValue>
          {color === undefined ? potData?.colorTag : color}
        </SelectValue>
      </SelectTrigger>
      <p
        className="p-3 border-[1px] rounded-lg"
        style={{
          color: translateColorToHex(potData?.colorTag as string),
        }}
      >
        Current Color: {potData?.colorTag}
      </p>
      <SelectContent className="max-h-[20rem] overflow-y-auto">
        {colorOptions.map((color) => (
          <SelectItem
            key={color}
            value={color}
            onSelect={() => {
              setColor(color as ColorTag);
            }}
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
