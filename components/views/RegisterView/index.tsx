"use client";
import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Web3 from 'web3';
import axios from "axios";
import { config } from "@/config";
import { generateUsername } from "@/lib/generateUsername";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CONTRACT_ADDRESS from "@/components/contract/contract_address.json";
import CONTRACT_ABI from "@/components/contract/ABI.json";

export default function RegisterView() {
  const router = useRouter();
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const session = useSession();

  if (session.data?.user?.name) {
    router.push("/dashboard");
  }

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
          setContract(contractInstance);
        } catch (error) {
          console.error('Error fetching contract data:', error);
        }
      } else {
        console.log('Provider ethereum not found');
      }
    };
    init();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!email || !password || !confirmPassword) {
      alert("Please fill the inputs");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    try {
      const username = generateUsername(email);

      if (!web3 || !contract) {
        console.error('Web3 or contract not ready');
        return;
      }

      const accounts = await web3.eth.getAccounts();
      await contract.methods.registerStreamer(username).send({ from: accounts[0] });
      console.log('Registration successful');

      const payload = { email, password };
      await axios.post(`${config.baseUrl}/api/auth/register`, payload);
      router.push("/success/signup");
    } catch (error) {
      console.error('Error occurred during registration:', error);
      alert("Failed to register");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/"><HeaderSection /></Link>

      {/* main content */}
      <main className="flex flex-col py-5 justify-center items-center gap-8 w-[1000px] mx-auto">
        <div className="mt-20 flex flex-col items-start justify-center">
          <ShadowBoxButton className="text-[16px] w-[145px] h-[42px] bg-orange">
            Signup
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="746px"
            widht="1000px"
            backgroundColor="#FAFFDF"
            innerClassName="px-14 py-14"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-start item-center gap-6"
            >
              {/* email input */}
              <div className="w-full border-b border-black flex flex-col gap-1">
                <Label htmlFor="email" className="text-2xl font-normal">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
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
              {/* confirm password */}
              <div className="w-full border-b border-black flex flex-col gap-1">
                <Label
                  htmlFor="confirmPassword"
                  className="text-2xl font-normal"
                >
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  autoFocus={false}
                  aria-autocomplete="none"
                  className="w-full bg-transparent focus:bg-transparent border-none border-transparent focus:border-transparent"
                />
              </div>
              {/* button submit */}
              <div className="mt-10 self-end">
                <ShadowBoxButton type="submit" className="bg-yellowGold">
                  Register
                </ShadowBoxButton>
              </div>
            </form>
          </ShaodowBoxDiv>
        </div>
      </main>
    </div>
  );
}
