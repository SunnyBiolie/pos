"use server";

import { shop } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getShopById = async (shopId: number) => {
  try {
    const shop: shop | null = await prisma.shop.findFirst({
      where: {
        id_shop: shopId,
      },
    });
    return shop;
  } catch (err) {
    console.error(err);
  }
};
