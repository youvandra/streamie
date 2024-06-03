import React from "react";

import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import Link from "next/link";
export default function TermsView() {
  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/"><HeaderSection /></Link>

      {/* main content */}
      <main className="flex flex-col py-5 justify-center items-center gap-8 w-[1000px] mx-auto">
        <div className="mt-20 flex flex-col items-start justify-center">
          <ShadowBoxButton className="text-[16px] w-[145px] h-[42px] bg-greenLight">
            T&C
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="420px"
            widht="1000px"
            backgroundColor="#FFB5E6"
            innerClassName="flex justify-start"
          >
            <div className="mx-20 py-9">
              {
                "TBD"
              }
            </div>
          </ShaodowBoxDiv>
        </div>
      </main>
    </div>
  );
}
