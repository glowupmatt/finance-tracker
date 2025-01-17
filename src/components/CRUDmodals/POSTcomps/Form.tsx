import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import SubmitButton from "./SubmitButton";
import { PotType } from "@/types/PotTypes";
import { ColorTag } from "@prisma/client";
import { translateColorToHex } from "@/utils/translateColorToHex";
import { useForm } from "@/hooks/useForm";

type Props = {
  type: "POT" | "BUDGET";
  CRUD: "POST" | "PUT";
  potData: PotType | undefined;
};

const Form = (props: Props) => {
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

  const { type, CRUD, potData } = props;

  const { color, setColor, getInputs, onSubmitHandler } = useForm(
    type,
    CRUD,
    potData
  );

  const inputs = getInputs();

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
      {inputs[type].map((input) => (
        <label key={input.label} className="flex flex-col gap-1">
          <p className="text-[.7rem] font-semibold text-greyDark">
            {input.label}
          </p>
          {input.label === "Color Tag" ? (
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
          ) : (
            <input
              type={input.type}
              className="border border-greyLight rounded-md p-2 ml-1"
              value={input.value || ""}
              onChange={(e) => input.setValue(e.target.value)}
            />
          )}
        </label>
      ))}
      <SubmitButton CRUD={CRUD} type={type} />
    </form>
  );
};

export default Form;
