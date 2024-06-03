import React from "react";

import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import Link from "next/link";

export default function SuccessSignupView() {
  return (
    <div className="flex flex-col  gap-2">
      {/* header */}
      <HeaderSection />
      <div className="flex flex-col items-center justify-center mt-7 gap-8">
        <h2 className="w-[452px] text-4xl text-center leading-[54px]">
          Success Create Account! Login here
        </h2>
        <Link href={"/login"}>
          <ShadowBoxButton className="bg-cyan">Login</ShadowBoxButton>
        </Link>
      </div>
    </div>
  );
}
