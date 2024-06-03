"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

type DonatePayload = {
  userId: number;
  amount: string;
  from: string;
  message: string;
};

export const donate = async (payload: DonatePayload) => {
  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
    },
    select: {
      id: true,
      username: true,
    },
  });

  const res = await prisma.donated.create({
    data: {
      userId: payload.userId,
      amount: payload.amount,
      from: payload.from,
      message: payload.message,
    },
  });

  revalidatePath(`/alert?username=${user?.username}`, "page");
  return res;
};

export const getDonatedData = async (username: string) => {
  // find user by username
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (!user) return null;

  const donated = await prisma.donated.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      from: true,
      amount: true,
      message: true,
      user: true,
    },
  });

  return donated;
};
