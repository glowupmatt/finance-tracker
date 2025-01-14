/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { Button } from "../../ui/button";
import HomeButton from "../HomeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const Header = () => {
  const { user } = useUser();

  if (!user) return null;
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow sticky top-0 z-50 lg:hidden">
      <HomeButton />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="p-2 bg-greyLighter rounded-full cursor-pointer">
            <AvatarImage src="/profile-image.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={() => signOut()} className="w-full text-left">
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Header;
