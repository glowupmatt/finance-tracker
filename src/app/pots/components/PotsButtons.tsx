import React from "react";
// import { PotType } from "@/types/PotTypes";
import { Button } from "@/components/ui/button";

// type Props = {
//   pot: PotType;
// };

const PotsButtons = () => {
  // const { pot } = props;
  return (
    <div className="flex w-full items-center justify-center gap-5">
      <Button variant={"secondary"}>
        <p className="font-semibold text-[.7rem]">+ Add Money</p>
      </Button>
      <Button variant={"secondary"}>
        <p className="font-semibold text-[.7rem]">Withdraw</p>
      </Button>
    </div>
  );
};

export default PotsButtons;
