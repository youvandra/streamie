"use client";
import React, { useEffect, useState } from "react";

import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";

import DonutIcon from "@/public/assets/images/Streamie1.png";
import DonutKerenIcon from "@/public/assets/images/Streamie2.png";
import Image from "next/image";
import Link from "next/link";
import ConnectWalletButton from "@/components/module/ConnectWalletButton";

export default function LandingViews() {

  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <HeaderSection />
      <div className="text-center">
        <h1 className="text-3xl w-[808px] mx-auto text-wrap leading-2xl">
          Spread Smiles, Streamers Style!
          <br />
          Donate with Streamie!
        </h1>
      </div>
      {/* login btn */}
      <div className="mx-auto flex my-5 flex-col justify-center">
        <Link href={"/login"}>
          <ShadowBoxButton className="bg-yellowGold mx-auto">
            Login
          </ShadowBoxButton>
        </Link>
      </div>
      {/* main content */}
      <main className="flex flex-col py-5 justify-center items-center gap-5 w-[1000px] mx-auto">
        <ShaodowBoxDiv
          height="112px"
          widht="988px"
          innerClassName="flex justify-center items-center"
        >
          <div className="py-[15px] px-[76px]">
            <h5 className="leading-xl text-2xl">
              Streamie help you to receive financial support from your fans with
              global payment, you can easily cashout to your Web3 wallet.
            </h5>
          </div>
        </ShaodowBoxDiv>
        {/* div with labels */}
        <div className="mt-20 flex flex-col items-start justify-center">
          <ShadowBoxButton className="text-[16px] w-[145px] h-[42px] bg-orange cursor-default">
            Starting Out
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="220px"
            innerClassName="flex justify-start items-center"
          >
            <div className="mx-20 py-6">
              <h3 className="text-[24px]">1. Register your account</h3>
              <h3 className="text-[24px]">2. Choose and set your overlay</h3>
              <h3 className="text-[24px]">
                3. Don’t forget to put your Streamie link 
              </h3>
              <h3 className="text-[24px]">4. Say thank you to your Donor!</h3>
            </div>
          </ShaodowBoxDiv>
        </div>
        {/* ready to join us section */}
        <div className="flex self-center mt-20 justify-center items-center gap-x-10">
          <Image src={DonutIcon} alt="" height={160} width={160} />
          <div className="flex flex-col gap-5">
            <h3 className="text-4xl">Ready join with us ?</h3>
              <Link href={"/register"}>
                <ShadowBoxButton className="text-[24px] bg-cyan">
                  Register
                </ShadowBoxButton>
              </Link>
          </div>
        </div>

        {/* last grouped section */}
        <div className="flex flex-col gap-14 mt-20">
          <div className=" flex flex-col items-start justify-center">
            <ShadowBoxButton className="text-[16px] w-[145px] h-[42px] bg-magenta cursor-default">
              Pricing
            </ShadowBoxButton>
            <ShaodowBoxDiv
              height="220px"
              innerClassName="flex justify-start items-center"
            >
              <div className="mx-20 py-6">
                <h2 className="text-2xl">
                  Every transaction will be charged with 1% platform fee,
                  Cashout to your Web3 wallet will not incur transfer fees.
                </h2>
              </div>
            </ShaodowBoxDiv>
          </div>
          <Link href={"/faq"}>
            <ShaodowBoxDiv
              height="220px"
              innerClassName="flex justify-end items-center"
              backgroundColor="#C8AEFF"
            >
              <div className="mx-auto py-6 flex flex-col justify-center gap-3 items-center">
                <h3 className="text-[24px]">Confused ?</h3>
                <h3 className="text-[24px]">Have a questions?</h3>
                <h3 className="text-[24px]">Check our faq</h3>
              </div>
              <div className="mr-20">
                <Image
                  src={DonutKerenIcon}
                  alt=""
                  width={213}
                  height={213}
                  className=""
                />
              </div>
            </ShaodowBoxDiv>
          </Link>
          <div className="flex justify-between">
            <Link href={"/tutorial"}>
              <ShadowBoxButton className="w-[448px] h-[63px] bg-yellowGold">
                Tutorial
              </ShadowBoxButton>
            </Link>
            <Link href={"/terms"}>
              <ShadowBoxButton className="w-[448px] h-[63px] bg-orange">
                Terms and condition
              </ShadowBoxButton>
            </Link>
          </div>
        </div>
      </main>
      {/* footer */}
      <div className="pt-24 pb-6">
        <div className="flex justify-center items-baseline">
          <h3>{"Made with <3 from Streamie!"}</h3>
        </div>
      </div>
    </div>
  );
}
