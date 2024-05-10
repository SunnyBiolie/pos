"use client";

import { UserContextProvider } from "@/hooks/use-user";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};
