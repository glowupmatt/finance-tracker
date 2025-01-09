"use client";

import React from "react";
import LoginForm from "./LoginForm";
import LoginSignupImage from "./LoginSignupImage";

const SessionForm = () => {
  return (
    <section>
      <div className="bg-greyDark p-4 flex justify-center items-center rounded-b-xl absolute top-0 left-0 w-full lg:hidden">
        <img src="/images/logo-large.svg" alt="app logo" />
      </div>
      <div className="flex bg-greyLighter gap-[4rem] w-full items-center min-w-[100vw] min-h-[100vh]">
        <LoginSignupImage />
        <div className="flex justify-center lg:content-start lg:items-center top-0 right-0 w-full lg:w-1/2 h-full lg:h-screen relative">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default SessionForm;
