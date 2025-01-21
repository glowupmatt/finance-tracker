/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Selectors from "./Selectors";
import { formatter } from "@/utils/transactionFunctions";

type Props = {
  input: any;
  CRUD: "POST" | "PUT";
};

const RenderInput = (props: Props) => {
  const { input, CRUD } = props;

  switch (input.label) {
    case "Category":
    case "Budget Category":
      return (
        <Selectors
          value={input.value}
          dataType="categoriesOptions"
          setLabel={(value: string) =>
            input.onChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      );
    case "Transaction Type":
      return (
        <Selectors
          value={input.value}
          dataType="transactionTypeOptions"
          setLabel={(value: string) =>
            input.onChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      );
    case "Color Tag":
      return (
        <Selectors
          value={input.value}
          dataType="colorOptions"
          setLabel={(value: string) =>
            input.onChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      );
    case "Paid":
      return (
        <input
          type={input.type}
          className="border border-greyLight rounded-md p-2 ml-1"
          checked={input.value as boolean}
          onChange={(e) => input.onChange(e)}
        />
      );
    case "Frequency":
      return (
        <Selectors
          value={input.value}
          dataType="frequencyOptions"
          setLabel={(value: string) =>
            input.onChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      );
    case "Transaction Date":
      return (
        <input
          type="date"
          className="border border-greyLight rounded-md p-2 ml-1"
          value={formatter.format(new Date(input.value))}
          onChange={(e) => input.onChange(e)}
        />
      );
    case "Paid":
    case "Cancelled":
      return CRUD === "PUT" ? (
        <input
          type={input.type}
          className="border border-greyLight rounded-md p-2 ml-1"
          checked={input.value as boolean}
          onChange={(e) => input.onChange(e)}
        />
      ) : null;
    default:
      return (
        <input
          type={input.type}
          placeholder={input.value ? input.value : "Input Value"}
          className="border border-greyLight rounded-md p-2 ml-1"
          value={input.value}
          onChange={(e) => input.onChange(e)}
        />
      );
  }
};

export default RenderInput;
