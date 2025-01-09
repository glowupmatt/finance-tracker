"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import LoadingState from "../ui/loadingState";

const LoginForm = () => {
  const [VARIANT, setVARIANT] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (VARIANT === "signup") {
      setLoading(true);
      try {
        await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div className="bg-white p-8 flex items-center justify-center flex-col lg:w-[500px] lg:min-h-[422px] rounded-md">
      <h3 className="text-xl font-bold mb-4">
        {VARIANT[0].toUpperCase() + VARIANT.slice(1)}
      </h3>
      <form className="w-full" onSubmit={onSubmitHandler}>
        {VARIANT === "signup" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="firstName"
                className="mt-1 block w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="lastName"
                className="mt-1 block w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

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
            autoComplete="email"
            className="mt-1 block w-full"
            onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="current-password"
            className="mt-1 block w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <Button
            disabled={loading}
            className="flex justify-center w-full items-center"
            variant={"secondary"}
          >
            <LoadingState />
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            {VARIANT === "login" ? "Login" : "Signup"}
          </Button>
        )}
      </form>
      <div
        className="flex align-center justify-center mt-4 gap-2"
        onClick={() => setVARIANT(VARIANT === "login" ? "signup" : "login")}
      >
        <p className="w-full">
          Need to create an account?{" "}
          <span className="font-bold cursor-pointer">
            {VARIANT === "login" ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
