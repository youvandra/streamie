import { generateUsername } from "@/lib/generateUsername";
import { prisma } from "@/lib/prisma";

export const createRegisterUser = async ({
  email,
  password,
}: {
  password: string;
  email: string;
}) => {
  if (!email || !password) {
    throw new Error("email and password not provided");
  }

  let username = generateUsername(email);

  // find username if exist
  const isUserNameExist = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (isUserNameExist) {
    username = username + Math.floor(Math.random() * 1000).toString();
  }

  // create user
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return user;
};
