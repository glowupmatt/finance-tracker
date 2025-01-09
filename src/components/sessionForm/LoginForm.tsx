import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

type Props = {};

const LoginForm = ({}: Props) => {
  return (
    <div className="bg-white p-8 flex items-center justify-center flex-col lg:w-[500px] lg:min-h-[422px] rounded-md">
      <h3 className="text-xl font-bold mb-4">Login</h3>
      <form className="w-full">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full"
          />
        </div>
      </form>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <div className="flex align-center justify-center mt-4 gap-2">
        <p className="w-full">
          Need to create an account?{" "}
          <span className="font-bold cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
