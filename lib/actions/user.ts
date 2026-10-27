"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export const hasDatabaseUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return false;

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    return Boolean(existingUser);
  } catch (error) {
    console.error("Error checking database user", error);
    return false;
  }
};

export const syncUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    // 1. Extract and validate Email
    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      console.error("El usuario de Clerk no tiene un email válido");
      return null;
    }

    // 2.Search if user exists by Clerk or Email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ clerkId: user.id }, { email: email }],
      },
    });

    // 3. If user existes, update and return
    if (existingUser) {
      return await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          clerkId: user.id,
          email: email,
          firstName: user.firstName ?? existingUser.firstName,
          lastName: user.lastName ?? existingUser.lastName,
          phone: user.phoneNumbers?.[0]?.phoneNumber ?? existingUser.phone,
        },
      });
    }

    // 4. If user's new create at Neon-Prisma
    return await prisma.user.create({
      data: {
        clerkId: user.id,
        email: email,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phone: user.phoneNumbers?.[0]?.phoneNumber ?? null,
      },
    });
  } catch (error) {
    console.error("Error syncing user with Prisma:", error);
    return null;
  }
};
