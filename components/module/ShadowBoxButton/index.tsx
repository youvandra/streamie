"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function ShadowBoxButton({
  children,
  className,
  onClick,
  type = "button",
  loading = false,
}: React.PropsWithChildren & {
  className?: string;
  onClick?: (e?: any) => any;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}) {
  return (
    <div className="rounded-xl w-max h-max  drop-shadow-xl shadow-black relative bg-black border-black  border-l-[1.4px] border-b-[1.4px]">
      <button
        type={type || "button"}
        onClick={onClick}
        className={cn(
          "rounded-xl -translate-y-[4px] translate-x-[5px] w-[215px] h-[63px] border border-black px-5 py-2 bg-white",
          className
        )}
      >
        {loading ? 'Loading...' : children}
      </button>
    </div>
  );
}