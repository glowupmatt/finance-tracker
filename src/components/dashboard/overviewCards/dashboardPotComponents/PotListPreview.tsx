import ColorSideTab from "@/components/ui/ColorSideTab";
import { Pot } from "@/types/PotTypes";
import React from "react";

type Props = {
  sortedPots: Pot[] | undefined;
};

const PotListPreview = ({ sortedPots }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-2 mt-4">
      {sortedPots
        ?.filter((_, index) => index <= 3)
        ?.map((pot, index) => (
          <li
            key={index}
            className="text-greySemiDark flex items-center flex-row gap-2"
          >
            <ColorSideTab />
            <p>{pot.title}</p>
          </li>
        ))}
    </ul>
  );
};

export default PotListPreview;
