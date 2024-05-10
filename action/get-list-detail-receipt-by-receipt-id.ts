"use server";

import { detail_receipt } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getListDetailReceiptByReceiptId = async (receiptId: number) => {
  try {
    const detailReceiptList: detail_receipt[] =
      await prisma.detail_receipt.findMany({
        where: {
          id_receipt: receiptId,
        },
      });
    return detailReceiptList;
  } catch (err) {
    console.error(err);
  }
};
