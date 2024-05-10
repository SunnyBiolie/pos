"use server";

import { prisma } from "@/lib/prisma";
import { customer } from "@prisma/client";

export const getListCustomerByShopId = async (shopId: number) => {
  try {
    const listCutomer: customer[] = await prisma.customer.findMany({
      where: {
        id_shop: shopId,
      },
    });
    return listCutomer;
  } catch (err) {
    console.log(err);
  }
};
