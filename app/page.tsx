"use client";

import { useEffect, useState } from "react";
import { CardItem } from "@/components/cart-item";
import { CustomerSelection } from "@/components/customer-selection";
import { type ProductInBill } from "@/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { ListProduct } from "@/components/list-product";
import { useDBUser } from "@/hooks/use-user";
import { createReceipt } from "@/action/create-receipt";
import { toast } from "sonner";
import { Loading } from "@/components/loading";
import { SignOut } from "@/components/sign-out";

export default function Home() {
  const userDB = useDBUser();

  const [prosInCard, setProsInCard] = useState<ProductInBill[]>([]);
  const [totalBill, setTotalBill] = useState<number | null>(null);
  const [customer, setCustomer] = useState<string | null>(null);

  useEffect(() => {
    setTotalBill(() => {
      return prosInCard.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.productPrice * currentValue.quantity,
        0
      );
    });
  }, [prosInCard]);

  if (userDB.isStaff === null)
    return (
      <div className="size-full">
        <Loading />
      </div>
    );
  if (userDB.isStaff === false)
    return (
      <div className="size-full flex flex-col items-center justify-center gap-4">
        You are not staff!
        <SignOut />
      </div>
    );

  const onPay = async () => {
    if (totalBill && userDB.user && customer && prosInCard) {
      await createReceipt(
        "Cash",
        totalBill,
        userDB.user.id_shop,
        parseInt(customer),
        prosInCard
      );

      toast.success("Successful transaction!");
      setProsInCard([]);
    }
  };

  return (
    <div className="size-full flex flex-col p-4 pt-0 overflow-hidden">
      <Header />
      <div className="flex-1 flex gap-x-4 overflow-hidden">
        <div className="basis-[60%] size-full bg-neutral-900 rounded-md shadow-md p-4">
          <ListProduct prosInCard={prosInCard} setProsInCard={setProsInCard} />
        </div>
        <div className="basis-[40%] size-full bg-neutral-900 rounded-md shadow-md flex flex-col p-4">
          <div className="px-2">
            <CustomerSelection setCustomer={setCustomer} />
          </div>
          <ScrollArea className="h-full">
            {prosInCard && prosInCard.length > 0 ? (
              prosInCard.map((pro, index) => (
                <CardItem
                  key={index}
                  product={pro}
                  prosInCard={prosInCard}
                  setProsInCard={setProsInCard}
                />
              ))
            ) : (
              <div className="text-center p-4 text-neutral-300">
                Pick some item(s)
              </div>
            )}
          </ScrollArea>
          <div className="p-2 flex flex-col gap-4">
            <div className="flex-1 flex items-center justify-between gap-x-4">
              <span className="font-semibold">Total Payment</span>
              <span className="font-semibold">${totalBill?.toFixed(2)}</span>
            </div>
            <Button
              className="grow-1 px-8 float-right"
              disabled={prosInCard.length === 0 || !customer ? true : false}
              onClick={onPay}
            >
              Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
