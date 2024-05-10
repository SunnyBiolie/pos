"use server";

import { product } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getListProductByShopId = async (shopId: number) => {
  try {
    const productList: product[] = await prisma.product.findMany({
      where: {
        id_shop: shopId,
      },
    });
    return productList;
  } catch (err) {
    console.error(err);
  }
};
