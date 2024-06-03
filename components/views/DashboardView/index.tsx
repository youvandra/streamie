"use client";
import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import { ethers } from 'ethers';
import DonutIcon from "@/public/assets/images/Streamie1.png";
import DonutIcon2 from "@/public/assets/images/Streamie2.png";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardView() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user?.name) {
      router.push("/");
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      // Tangani kesalahan logout di sini jika diperlukan
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/dashboard"><HeaderSection /></Link>
      
      {/* main */}
      <main className="flex px-32 mt-10 justify-center items-center gap-10">
        {/* card 1 */}
        <Link href={"/overlay"}>
          <div className="flex flex-col items-center w-max justify-center mt-7 gap-8 translate-y-[52px]">
            <ShaodowBoxDiv
              height="296px"
              widht="532px"
              backgroundColor="#C8AEFF"
            >
              <div className="flex">
                <div className="flex flex-col gap-y-32 h-full py-10 px-8">
                  <h3 className="text-4xl font-normal">Overlay</h3>
                  <h6 className="text-[20px] leading-[30px]">
                    Set alerts and overlays here
                  </h6>
                </div>
                <div className="flex items-center justify-end translate-x-10">
                  <Image
                    src={DonutIcon}
                    alt=""
                    height={102}
                    width={102}
                    className=""
                  />
                </div>
              </div>
            </ShaodowBoxDiv>
          </div>
        </Link>

        {/* card 2 */}
        <Link href={"/support"}>
          <div className="flex flex-col w-max items-end  mt-7 gap-5 relative">
            <ShadowBoxButton className="mx-auto min-w-[146px] h-[81px] cursor-default">
              {session?.data?.user?.name}
            </ShadowBoxButton>
            <ShaodowBoxDiv
              height="296px"
              widht="532px"
              backgroundColor="#F4CD00"
            >
              <div className="flex">
                <div className="flex flex-col gap-y-32 h-full py-10 px-8">
                  <h3 className="text-4xl font-normal">Incoming Support</h3>
                  <h6 className="text-[20px] leading-[30px]">
                    View support and cashout history
                  </h6>
                </div>
                <div className="flex items-center justify-end -translate-x-5 translate-y-2">
                  <Image
                    src={DonutIcon2}
                    alt=""
                    height={131}
                    width={131}
                    className=""
                  />
                </div>
              </div>
            </ShaodowBoxDiv>
          </div>
        </Link>
      </main>

      <br />
      
      <div className="flex justify-center items-center">
        <div className="rounded-xl drop-shadow-xl shadow-black relative bg-black border-black border-l-[1.4px] border-b-[1.4px]">
          <button
            onClick={handleLogout}
            className={cn(
              "rounded-xl w-[215px] h-[63px] border border-black px-5 py-2 bg-white",
            )}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
