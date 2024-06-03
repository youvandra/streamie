import Image from "next/image";
import React from "react";

import DonutIconLogo from "@/public/assets/images/logo.png";
import Link from "next/link";

export default function HeaderSection() {
  return (
    <div className="flex flex-col text-center justify-center items-center pt-8 pb-2">
      
      <Image
        src={DonutIconLogo}
        alt="Donuts icon"
        height={160}
        width={160}
        className=""
      />
      <h1 className="font-bold text-[#000000] text-4xl leading-[54px] inline-block mx-auto">
        Streamie!
      </h1>
      
    </div>
  );
}
