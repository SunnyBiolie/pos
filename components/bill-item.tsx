"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BillDetails } from "./bill-details";
import { receipt } from "@prisma/client";

interface BillItemProps {
  bill: receipt;
}

export const BillItem = ({ bill }: BillItemProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  return (
    <>
      <div
        className="w-full flex items-center justify-between bg-neutral-900 px-4 py-3 rounded-md hover:bg-neutral-800 cursor-pointer"
        onClick={() => setIsOpenDetails((prev) => !prev)}
      >
        <div className="flex items-center gap-x-2">
          <span>ID: {bill.id_receipt}</span>
        </div>
        <span>${bill.total_amount_receipt}</span>
        <span>
          {bill.date_receipt.toLocaleDateString("en-EN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      {isOpenDetails && (
        <div className="fixed top-0 left-0 size-full bg-neutral-950/75 backdrop-blur-sm">
          <div
            className="absolute top-4 right-4 rounded-full p-2 bg-[#604be8] cursor-pointer"
            onClick={() => setIsOpenDetails((prev) => !prev)}
          >
            <IoClose className="size-6" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-900">
            <BillDetails bill={bill} />
          </div>
        </div>
      )}
    </>
  );
};
