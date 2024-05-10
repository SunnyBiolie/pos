"use server";

import { prisma } from "@/lib/prisma";
import { ProductInBill } from "@/schema";

export const createDetailReceipt = async (
  product: ProductInBill,
  cusName: string,
  cusPhone: number,
  idReceipt: number
) => {
  await prisma.detail_receipt.create({
    data: {
      name_product: product.productName,
      price_product: product.productPrice,
      quantity_product: product.quantity,
      name_customer: cusName,
      phone_customer: cusPhone,
      id_receipt: idReceipt,
    },
  });
};
