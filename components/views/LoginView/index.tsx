"use client";
import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ethers } from 'ethers';
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { generateUsername } from "@/lib/generateUsername";
import CONTRACT_ADDRESS from "@/components/contract/contract_address.json";
import CONTRACT_ABI from "@/components/contract/ABI.json";
import { Web3Provider } from '@ethersproject/providers';


export default function LoginView() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const session = useSession();
  
  const contractAddress = '0xfE5f25baF1CDE2C5451d8cA03B608b2cD8832367';

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');

  if (session.data?.user?.name) {
    router.push("/dashboard");
  }

  const addAvalancheFujiNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xA869', // Chain ID for Avalanche Fuji
            chainName: 'Avalanche Fuji C-Chain',
            nativeCurrency: {
              name: 'AVAX',
              symbol: 'AVAX',
              decimals: 18,
            },
            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
          }],
        });
        console.log('Network added!');
      } catch (error) {
        console.error('Failed to add the network', error);
      }
    } else {
      console.error('MetaMask is not installed.');
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setConnected(true);
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('Failed to connect MetaMask', error);
      }
    } else {
      console.error('MetaMask is not installed.');
    }
  };

  const handleConnectWallet = async () => {
    await addAvalancheFujiNetwork();
    await connectMetaMask();
  };

  const handleLogin = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      await signIn("credentials", { email, password });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/"><HeaderSection /></Link>
      <ToastContainer />
      {/* main content */}
      <main className="flex flex-col py-5 justify-center items-center gap-8 w-[1000px] mx-auto">
        <div className="mt-20 flex flex-col items-start justify-center">
          <ShadowBoxButton className="text-[16px] w-[145px] h-[42px] bg-orange">
            Login
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="420px"
            widht="1000px"
            backgroundColor="#FAFFDF"
            innerClassName="px-14 py-14"
          >
            <form
              action={handleLogin}
              className="flex flex-col justify-start item-center gap-6"
            >
              {/* email input */}
              <div className="w-full border-b border-black flex flex-col gap-1">
                <Label htmlFor="email" className="text-2xl font-normal">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  className="w-full bg-transparent focus:bg-transparent border-none border-transparent focus:border-transparent"
                />
              </div>
              {/* password input */}
              <div className="w-full border-b border-black flex flex-col gap-1">
                <Label htmlFor="password" className="text-2xl font-normal">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  autoFocus={false}
                  aria-autocomplete="none"
                  className="w-full bg-transparent focus:bg-transparent border-none border-transparent focus:border-transparent"
                />
              </div>
              {/* button submit */}
              {!connected ? 
              <div className="mt-10 self-end">
                <ShadowBoxButton 
                  type="button" 
                  className="bg-yellowGold"
                  onClick={handleConnectWallet} 
                >
                  Connect Wallet
                </ShadowBoxButton>
              </div>
              :
              <div className="mt-10 self-end">
                <ShadowBoxButton type="submit" className="bg-yellowGold">
                  Login
                </ShadowBoxButton>
              </div>
              }
            </form>
          </ShaodowBoxDiv>
        </div>
      </main>
    </div>
  );
}
