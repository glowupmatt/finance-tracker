import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="w-full bg-white rounded-t-md p-4">
      <Input
        type="text"
        className="w-full p-2"
        placeholder="Search for a transaction"
      />
      <div>
        <p>Sort By</p>
      </div>
    </div>
  );
};

export default SearchBar;
