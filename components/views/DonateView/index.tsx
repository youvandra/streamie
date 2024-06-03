"use client";
import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShadowBoxDiv from "@/components/module/ShadowBoxDiv"; // Perbaikan di sini
import ShadowBoxInput from "@/components/module/ShadowBoxInput";
import { Checkbox } from "@/components/ui/checkbox";
import { donate } from "@/actions/donated";
import Web3 from "web3";
import CONTRACT_ADDRESS from "@/components/contract/contract_address.json";
import CONTRACT_ABI from "@/components/contract/ABI.json";

type Props = {
  user: {
    id: number;
    username: string;
  };
  donate: typeof donate;
};

export default function DonateView(props: Props) {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const contractInstance = new web3Instance.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      } else {
        console.log("Provider ethereum not found");
      }
    };
    init();
  }, []);

  const handleDonate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const above18 = formdata.get("18-above") ? true : false;
    const anymous = formdata.get("anymous") ? true : false;

    const from = formdata.get("from") as string;
    const amount = formdata.get("amount") as string;
    const message = formdata.get("message") as string;
    if (!from) return alert(`required fill input "From"`);
    if (!amount) return alert(`required fill input "amount"`);
    if (!above18) {
      return alert(`Please fill checkbox if you are 18 years old or above`);
    }
    try {
      if (!web3 || !contract) {
        console.error("Web3 or contract not ready");
        return;
      }
      console.log(props.user.username);
      console.log(web3.utils.toWei(amount, "ether"));
      setLoading(true); // Mark that the donation process is ongoing
      try {
        const accounts = await web3.eth.getAccounts();
        // Call the donate function on the smart contract with the username
        await contract.methods.donate(props.user.username).send({
          from: accounts[0],
          value: web3.utils.toWei(amount, "ether"),
        });

        props.donate({
          from: anymous ? "Anonymous" : from,
          amount: String(amount),
          message,
          userId: props.user.id,
        });

        console.log("Donation successful");
      } catch (error) {
        console.error("Failed to make donation:", error);
      } finally {
        setLoading(false); // Stop the loading indication after completion
      }
    } catch (error) {
      console.error("Error occurred while donating:", error);
      alert(`Failed to donate`);
    } finally {
      alert(`Donated to: ${props.user.username} successfully`);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <HeaderSection />

      {/* main content */}
      <main className="flex flex-col py-5 justify-center items-center gap-8 w-[512px] mx-auto">
        <div className="flex justify-between w-full">
          <h1 className="text-4xl">Donate to :</h1>
          <ShadowBoxButton className="min-w-[146px] h-[80px]">
            {props.user.username}
          </ShadowBoxButton>
        </div>
        <ShadowBoxDiv widht="512px" height="540px" backgroundColor="#FAFFDF">
          <form
            onSubmit={handleDonate}
            className="px-6 py-6 flex flex-col gap-y-4"
          >
            <ShadowBoxInput type="text" name="from" label="From:" />
            {/* checkbox anonymous */}
            <div className="flex items-center w-4/4 gap-3">
              <Checkbox
                name="anymous"
                id="anymous"
                className="w-[26px] h-[26px] border border-black p-2 bg-white rounded-xl checked:bg-transparent shadow-lg shadow-black/25 "
              />
              <span className="text-[15px] font-normal">Anonymous</span>
            </div>
            <ShadowBoxInput
              type="number"
              name="amount"
              label="Amount (AVAX):"
              min="0"
              step="0.001"
            />
            <ShadowBoxInput type="text" name="message" label="Message:" />
            {/* 18 year checkbox */}
            <div className="flex items-center w-4/4 gap-3">
              <Checkbox
                name="18-above"
                id="18-above"
                className="w-[26px] h-[26px] border border-black p-2 bg-white rounded-xl checked:bg-transparent shadow-lg shadow-black/25 "
              />
              <span className="text-[15px] font-normal">
                18 years old and above<span className="text-red-500">*</span>
              </span>
            </div>
            {/* agree checkbox */}
            <div className="flex items-center w-4/4 gap-3">
              <Checkbox
                name="agree-term"
                id="agree-term"
                className="w-[26px] h-[26px] border border-black p-2 bg-white rounded-xl checked:bg-transparent shadow-lg shadow-black/25 "
              />
              <span className="text-[15px] font-normal">
                I agree that this support is provided on a voluntary basis in
                accordance with the terms and conditions.{" "}
              </span>
            </div>
            <div className="mx-auto mt-5">
              <ShadowBoxButton
                type="submit"
                className="bg-yellowGold w-[147px] h-[47px]"
              >
                {loading ? "Loading..." : "Donate"}
              </ShadowBoxButton>
            </div>
          </form>
        </ShadowBoxDiv>
      </main>
    </div>
  );
}
