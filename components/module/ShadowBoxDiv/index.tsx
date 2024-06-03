import { ColorsVariant } from "@/colors";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  widht?: string;
  height?: string;
  backgroundColor?: ColorsVariant;
  outterclassName?: string;
  innerClassName?: string;
};

export default function ShaodowBoxDiv({
  children,
  backgroundColor = "#FFFFFF",
  outterclassName,
  innerClassName,
  height = "420px",
  widht = "1000px",
}: React.PropsWithChildren & Props) {
  return (
    <div
      className={cn(
        "rounded-xl w-max h-max border-l-[4px] border-b-[4px] drop-shadow-xl shadow-black relative bg-black border-black",
        outterclassName
      )}
    >
      <div
        style={{
          height: height,
          width: widht,
          backgroundColor: backgroundColor,
        }}
        className={cn(
          `rounded-xl -translate-y-[4px] translate-x-[5px] border border-black shadow-lg shadow-black/25`,
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
