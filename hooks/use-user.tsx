"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { user } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { getUserByEmail } from "@/action/get-user-by-email";

type UserContextType = {
  isStaff: boolean | null;
  user: user | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const [isStaff, setIsStaff] = useState<boolean | null>(null);

  const { user, isLoaded } = useUser();

  const [dbUser, setDBUser] = useState<user | null>(null);

  useEffect(() => {
    if (user) {
      const fetch = async () => {
        return await getUserByEmail(user.emailAddresses[0].emailAddress || "");
      };
      fetch().then((data) => {
        if (data) {
          setDBUser(data);
          setIsStaff(true);
        } else {
          setIsStaff(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const value = {
    isStaff,
    user: dbUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useDBUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used with a UserContextProvider");
  }

  return context;
};
