"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const SignOut = () => {
  return (
    <SignOutButton>
      <Button size="sm" variant="ghost">
        Sign out
      </Button>
    </SignOutButton>
  );
};
