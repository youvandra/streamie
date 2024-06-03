import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
// import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  // Gunakan Prisma sebagai adapter
  //   adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Masukan Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Masukan Password",
        },
      },
      authorize: async (credential, req) => {
        console.log(credential);

        // find user by email & password
        const user = await prisma.user.findFirst({
          where: {
            email: credential?.email,
            password: credential?.password,
          },
        });

        if (!user) {
          console.log("user not found");
          return null;
        }

        console.log(user);

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // newUser: "/",
  },
  debug: true,
};
