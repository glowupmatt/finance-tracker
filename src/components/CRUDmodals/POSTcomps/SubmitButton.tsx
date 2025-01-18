import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React from "react";

type Props = {
  CRUD: "POST" | "PUT" | "DELETE";
  type: "POT" | "BUDGET" | "TRANSACTION";
};

const SubmitButton = (props: Props) => {
  const { CRUD, type } = props;
  const submitButton = (
    <Button
      type="submit"
      className={`p-2 rounded-md w-full ${
        type === "TRANSACTION" ? "col-span-2" : ""
      }`}
    >
      {CRUD === "POST"
        ? `+ Add New ${type[0].toUpperCase() + type.toLowerCase().slice(1)}`
        : "Update Pot"}
    </Button>
  );
  return <DialogClose asChild>{submitButton}</DialogClose>;
};

export default SubmitButton;
