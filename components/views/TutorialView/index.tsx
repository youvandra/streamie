import React from "react";

import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import Link from "next/link";
export default function TutorialView() {
  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/"><HeaderSection /></Link>

      {/* main content */}
      <main className="flex flex-col py-5 justify-center items-center gap-8 w-[1000px] mx-auto">
        <div className="mt-20 flex flex-col items-start justify-center">
          <ShadowBoxButton className="text-[16px] w-[145px] h-[42px] bg-greenLight">
            Tutorial
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="420px"
            widht="1000px"
            backgroundColor="#FFB5E6"
            innerClassName="flex justify-start items-center"
          >
            <div className="mx-20 py-6">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dJWhc2jKGpQ?si=fQ2cZkMO3-VJqDFZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </ShaodowBoxDiv>
        </div>
      </main>
    </div>
  );
}
