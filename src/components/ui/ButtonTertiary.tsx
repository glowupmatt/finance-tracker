import React from "react";
import { Button } from "@/components/ui/button";
import { FaCaretRight } from "react-icons/fa"; // Importing the right-facing caret icon

type Props = {
  children: React.ReactNode;
};

const ButtonTertiary = ({ children }: Props) => {
  return (
    <Button
      variant={"tertiary"}
      className="flex items-center gap-2 hover:text-greyDark"
    >
      <p>{children}</p>
      <FaCaretRight />
    </Button>
  );
};

export default ButtonTertiary;
