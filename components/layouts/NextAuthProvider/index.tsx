"use client";

import React from "react";

import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";

export const NextAuthProvider = (props: {
  children: React.ReactNode;
  session: any;
}) => {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
};
