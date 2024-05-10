"use server";

import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email_user: email,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};
