"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const DashboardDisplay = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default DashboardDisplay;
