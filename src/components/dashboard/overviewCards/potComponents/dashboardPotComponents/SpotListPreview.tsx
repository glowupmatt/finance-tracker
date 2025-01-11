import { PotType } from "@/types/PotTypes";
import React from "react";

type Props = {
  sortedPots: PotType[] | undefined;
};

const SpotListPreview = ({ sortedPots }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-2 mt-4">
      {sortedPots
        ?.filter((_, index) => index <= 3)
        ?.map((pot, index) => (
          <li
            key={index}
            className="text-greySemiDark flex items-center flex-row gap-2"
          >
            <div
              className={`w-full max-w-[4px] h-[43px] border-none rounded-lg`}
              style={{ backgroundColor: pot.color }}
            />
            <p>{pot.title}</p>
          </li>
        ))}
    </ul>
  );
};

export default SpotListPreview;
