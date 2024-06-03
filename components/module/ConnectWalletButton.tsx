// components/module/ConnectWalletButton.tsx
"use client";
import React, { useState, useEffect } from "react";
import ShadowBoxButton from "./ShadowBoxButton";

const ConnectWalletButton: React.FC = () => {

  return (
    <div>
        <ShadowBoxButton className="bg-yellowGold mx-auto" >
          Login
        </ShadowBoxButton>
    </div>
  );
};

export default ConnectWalletButton;
