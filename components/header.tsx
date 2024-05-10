"use client";

import { useEffect, useState } from "react";
import { SignOut } from "./sign-out";
import { useDBUser } from "@/hooks/use-user";
import { shop } from "@prisma/client";
import { getShopById } from "@/action/get-shop-by-id";
import { Button } from "./ui/button";
import Link from "next/link";

export function Header() {
  const userDB = useDBUser();

  const [shop, setShop] = useState<shop | null>(null);

  useEffect(() => {
    if (userDB.user) {
      const fetch = async () => {
        return await getShopById(userDB.user!.id_shop);
      };
      fetch().then((data) => setShop(data!));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex items-center p-4 gap-x-16">
      <span className="text-lg font-medium">
        <Link href={"/"}>It&apos;s POS</Link>
      </span>
      <div className="flex-1 space-x-4 text-sm flex items-center justify-between">
        <div className="space-x-6">
          <span>{shop?.name_shop}</span>
          <span>Hello, {userDB.user?.name_user}</span>
        </div>
        <div className="space-x-2">
          <Button variant="link" size="sm" asChild>
            <Link href={"/bills"}>View Bill(s)</Link>
          </Button>
          <SignOut />
        </div>
      </div>
    </div>
  );
}
