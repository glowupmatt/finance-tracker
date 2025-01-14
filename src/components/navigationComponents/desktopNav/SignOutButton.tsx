import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <Button
      variant="destroy"
      onClick={() => signOut()}
      className="w-[15rem] rounded-r-xl rounded-l-none px-4 py-6 text-[1rem] relative top-0"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
