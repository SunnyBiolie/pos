"use server";

import { prisma } from "@/lib/prisma";

export const getCustomerById = async (customerId: number) => {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id_customer: customerId,
      },
    });
    return customer;
  } catch (err) {
    console.log(err);
  }
};
