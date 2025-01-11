import React from "react";
import LoadingState from "../ui/loadingState";

const LoadingStateHome = () => {
  return (
    <div className="min-h-screen min-w-[100vw] flex items-center justify-center flex-col gap-[5rem]">
      <p className="font-bold flex flex-col items-center justify-center gap-2">
        Loading your bad{" "}
        <span className="text-secondaryRed animate-pulse">
          financial decisions
        </span>
      </p>
      <LoadingState className="w-[3rem] h-[3rem]" />
    </div>
  );
};

export default LoadingStateHome;
