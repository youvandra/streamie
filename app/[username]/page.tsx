import React from "react";

import DonateView from "@/components/views/DonateView";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { donate } from "@/actions/donated";

const getPageDonate = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return user;
};

export default async function DonatePage({
  params,
}: {
  params: { username: string };
}) {
  const userData = await getPageDonate(params.username);

  if (!userData?.id) {
    return notFound();
  }

  return (
    <div className="h-full min-h-[100vh] bg-[#D9D9D9] pb-5">
      <DonateView
        user={{
          id: userData.id,
          username: userData.username,
        }}
        donate={donate}
      />
    </div>
  );
}
