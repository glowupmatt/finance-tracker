"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const LoginWithGuest = ({ setEmail, setPassword }: Props) => {
  const onClickHandler = () => {
    setEmail("guest@guest.io");
    setPassword("password");
  };
  return (
    <Button type="submit" onClick={onClickHandler}>
      Login With Guest
    </Button>
  );
};

export default LoginWithGuest;
