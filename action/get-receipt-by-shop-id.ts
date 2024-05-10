"use server";

import { prisma } from "@/lib/prisma";
import { receipt } from "@prisma/client";

export const getReceiptByShopId = async (shopId: number) => {
  try {
    const listReceipt: receipt[] = await prisma.receipt.findMany({
      where: {
        id_shop: shopId,
      },
    });
    return listReceipt;
  } catch (err) {
    console.log(err);
  }
};
