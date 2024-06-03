"use client";
import React from "react";
import Link from 'next/link';
import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";

import DonutIcon from "@/public/assets/images/Streamie2.png";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OverlayView() {
  const router = useRouter();
  const session = useSession();

  if (!session.data?.user?.name) {
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/dashboard"><HeaderSection /></Link>

      {/* main */}
      <main className="flex flex-col px-32 mt-10 justify-center items-center gap-10">
        {/* button group */}
        <Link href={`/alert?username=${session?.data?.user?.name}`} target="blank">
          <ShadowBoxButton className="mx-auto w-[146px] h-[81px] cursor-pointer bg-orange">
            Alert page
          </ShadowBoxButton>
        </Link>
        {/*  */}
        <ShaodowBoxDiv backgroundColor="#F4CD00" height="200px" widht="1000px">
          <div className="mx-auto flex flex-col gap-3 py-4">
            <div className="flex justify-center items-center gap-16">
              <h1 className="text-4xl font-bold leading-[54px] text-[#ff00ff]">
                Someone
              </h1>
              <h1 className="text-[32px] font-normal leading-[48px] ">
                Just give you
              </h1>
              <h1 className="text-4xl font-bold leading-[54px] text-[#ff00ff]">
                50 USD
              </h1>
            </div>
            <div className="w-[570px] mx-auto">
              <h3 className="text-2xl leading-9 text-center">
                This will be a message from your fans
              </h3>
            </div>
          </div>
        </ShaodowBoxDiv>
        {/*  */}
        <ShaodowBoxDiv backgroundColor="#FAFFDF" height="360px" widht="1000px">
          <h1 className="px-7 py-6 text-xl font-normal leading-[30px]">View</h1>
          <div className="px-10 ">
            {/* button group */}
            <div className="flex justify-start gap-x-16 items-center">
              <div className="space-y-2 text-start">
                <h3 className="ml-2">Background color</h3>
                <ShadowBoxButton className="bg-yellowGold w-[237px] h-[38px]">
                  choose
                </ShadowBoxButton>
              </div>
              <div className="space-y-2 text-start">
                <h3 className="ml-2">Highlight color</h3>
                <ShadowBoxButton className="bg-[#ff00ff] w-[237px] h-[38px]">
                  choose
                </ShadowBoxButton>
              </div>
              <div className="space-y-2 text-start">
                <h3 className="ml-2">Text color</h3>
                <ShadowBoxButton className="bg-black text-white w-[237px] h-[38px]">
                  choose
                </ShadowBoxButton>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-between items-center ml-1">
              {/* section 1 */}
              <div className="flex flex-col">
                <div className="w-full border-b ring-offset-0 border-black flex flex-col mt-12 relative">
                  <Label htmlFor="duration" className="font-normal">
                    Duration
                  </Label>
                  <Input
                    type="number"
                    id="duration"
                    autoComplete="off"
                    className="w-full text-black/75 bg-transparent focus:bg-transparent border-none border-transparent focus:border-none focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="inline-block absolute right-0 top-6 text-[15px] leading-5">
                    (ms)
                  </div>
                </div>
                <div className="mt-9 -translate-x-1">
                  <ShadowBoxButton className="bg-cyan w-[157px] h-[37px]">
                    Save
                  </ShadowBoxButton>
                </div>
              </div>
              {/* section 2 image */}
              <div className="flex justify-end items-end mr-2">
                <Image
                  src={DonutIcon}
                  alt=""
                  height={102}
                  width={102}
                  className="inline-block translate-y-8 -translate-x-10"
                />
              </div>
            </div>
          </div>
        </ShaodowBoxDiv>
      </main>
    </div>
  );
}
