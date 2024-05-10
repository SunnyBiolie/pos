"use server";

import { prisma } from "@/lib/prisma";
import { ProductInBill } from "@/schema";
import { createDetailReceipt } from "./create-detail-receipt";
import { getCustomerById } from "./get-customer-by-id";

export const createReceipt = async (
  method: string,
  totalBill: number,
  shopId: number,
  customerId: number,
  prosInCard: ProductInBill[]
) => {
  const customer = await getCustomerById(customerId);

  if (customer) {
    const receipt = await prisma.receipt.create({
      data: {
        payment_receipt: method,
        total_amount_receipt: totalBill,
        id_shop: shopId,
        id_customer: customerId,
      },
    });

    prosInCard.forEach((product) => {
      createDetailReceipt(
        product,
        customer.name_customer,
        customer.phone_customer,
        receipt.id_receipt
      );
    });
  }
};
