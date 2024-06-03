// SupportPage.tsx
"use client";// SupportPage.tsx
import React, { useEffect, useState } from "react";
import ShadowBoxNotif from "@/components/module/Notif";
import { getDonatedData } from "@/actions/donated";

export default function SupportPage({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  const [donateData, setDonateData] = useState<any>(null);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getDonatedData(searchParams.username);
      if (JSON.stringify(newData) !== JSON.stringify(donateData)) {
        setDonateData(newData);
        setShowNotif(true);
        setTimeout(() => {
          setShowNotif(false);
        }, 5000);
        // Putar suara
        const audio = new Audio("./sound.mp3");
        audio.play();
      }
    };

    const intervalId = setInterval(fetchData, 10000);
    fetchData(); // Ambil data pertama kali

    return () => {
      clearInterval(intervalId);
    };
  }, [searchParams.username, donateData]);

  return (
    <div className="h-screen flex justify-center items-center">
      {showNotif && <ShadowBoxNotif data={donateData} />}
    </div>
  );
}
