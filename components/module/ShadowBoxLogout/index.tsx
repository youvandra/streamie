"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React from "react";

export default function ShadowBoxButton({
  children,
  className,
  type = "button",
}: React.PropsWithChildren<{
  className?: string;
  type?: "button" | "submit" | "reset";
}>) {
  const router = useRouter();

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
    <div className="rounded-xl w-max h-max  drop-shadow-xl shadow-black relative bg-black border-black  border-l-[1.4px] border-b-[1.4px]">
      <button
        type={type}
        onClick={handleLogout} // Menggunakan fungsi handleLogout untuk logout saat tombol diklik
        className={cn(
          "rounded-xl -translate-y-[4px] translate-x-[5px] w-[215px] h-[63px] border border-black px-5 py-2 bg-white",
          className
        )}
      >
        {children}
      </button>
    </div>
  );
}
