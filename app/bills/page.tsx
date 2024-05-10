"use client";

import { useEffect, useState } from "react";
import { BillItem } from "@/components/bill-item";
import { Header } from "@/components/header";
import { useDBUser } from "@/hooks/use-user";
import { receipt } from "@prisma/client";
import { getReceiptByShopId } from "@/action/get-receipt-by-shop-id";

const BillsPage = () => {
  const userDB = useDBUser();

  const [billList, setBillList] = useState<receipt[] | null>(null);

  useEffect(() => {
    if (userDB.user) {
      const fetch = async () => {
        return await getReceiptByShopId(userDB.user!.id_shop);
      };
      fetch().then((data) => setBillList(data || null));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center p-4 pt-0">
      <Header />
      <div className="w-2/3 flex flex-col items-center gap-y-2 mt-2">
        {billList
          ? billList.map((bill, index) => <BillItem key={index} bill={bill} />)
          : "Nothing here!"}
      </div>
    </div>
  );
};

export default BillsPage;
