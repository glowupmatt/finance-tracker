import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  CRUD: "POST" | "PUT" | "DELETE";
  type: "POT" | "BUDGET";
};

const SubmitButton = (props: Props) => {
  const { CRUD, type } = props;
  const submitButton = (
    <Button className="p-2 rounded-md">
      {CRUD === "POST"
        ? `+ Add New Pot ${type[0].toUpperCase() + type.toLowerCase().slice(1)}`
        : "Update Pot"}
    </Button>
  );
  return <div>{submitButton}</div>;
};

export default SubmitButton;
