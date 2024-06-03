import React from "react";

import OverlayView from "@/components/views/OverlayView";

export default function OverlayPage() {
  return (
    <div className="h-full min-h-[100vh] bg-[#D9D9D9] pb-40">
      {/* @ts-ignore */}
      <OverlayView />
    </div>
  );
}
