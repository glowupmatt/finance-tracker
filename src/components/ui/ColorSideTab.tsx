import React from "react";
import generateRandomColor from "@/utils/randomColorGenerator";

const ColorSideTab = () => {
  return (
    <div
      className={`w-full max-w-[4px] h-[43px] border-none rounded-lg`}
      style={{ backgroundColor: generateRandomColor() }}
    />
  );
};

export default ColorSideTab;
