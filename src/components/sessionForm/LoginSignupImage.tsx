/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

const LoginSignupImage = ({}: Props) => {
  return (
    <div className="hidden lg:flex lg:flex-row h-screen relative">
      <div className="flex flex-col items-start justify-between p-8 text-white z-10 flex-grow absolute h-full max-h-[920px]">
        <img src="/images/logo-large.svg" alt="Next.js Logo" />
        <div className="lg:max-w-[400px] xl:max-w-[480px]">
          <h4 className="font-bold text-3xl mb-4">
            Keep track of your money and save for your future
          </h4>
          <p className="font-[14px]">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <div className="relative p-4 h-full">
        <img
          className="rounded-[10px] h-full"
          src="/images/illustration-authentication.svg"
          alt="Authentication Image"
        />
      </div>
    </div>
  );
};

export default LoginSignupImage;
