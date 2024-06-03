"use client";
import React, { useEffect, useState } from "react";
import ShaodowBoxDiv from "../ShadowBoxDiv";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Web3 from "web3";
import CONTRACT_ADDRESS from "@/components/contract/contract_address.json";
import CONTRACT_ABI from "@/components/contract/ABI.json";

type Props = {
  data: { from: string; amount: string; message: string }[] | null;
};

export default function ShadowBoxNotif(props: Props) {
  const router = useRouter();
  const usernameSearch = useSearchParams().get("username");

  const [isShow, setIsShow] = useState(true);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [priceFeed, setPriceFeed] = useState<number | null>(null); // State untuk menyimpan nilai harga

  const session = useSession();

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
        
        // Fetch price feed
        const priceFeedResult = await contractInstance.methods.getPriceFeed().call({ from: accounts[0] });
        if (priceFeedResult !== undefined && priceFeedResult !== null) {
          setPriceFeed(parseInt(priceFeedResult.toString(), 10)/ 100000000); // Konversi hasil menjadi angka
        } else {
          console.error('Price feed result is undefined or null');
        }
      } else {
        console.log('Provider ethereum not found');
      }
    };
    init();
  }, []);

  if (!props.data) {
    return null; // Jika null, tidak menampilkan apapun
  }

  return (
    <>
      {props.data.map((item, idx) => {
        // if (isShow)
        if (idx < 1)
          return (
            <ShaodowBoxDiv
              key={idx}
              backgroundColor="#F4CD00"
              height="200px"
              widht="750px"
            >
              <div className="mx-auto flex flex-col gap-3 py-4">
                <div className="flex justify-center items-center gap-16">
                  <h1 className="text-4xl font-bold leading-[54px] text-[#ff00ff]">
                    {item.from}
                  </h1>
                  <h1 className="text-[32px] font-normal leading-[48px] ">
                    Just give you
                  </h1>
                  {priceFeed !== null && (
                    <h1 className="text-4xl font-bold leading-[54px] text-[#ff00ff]">
                      {(parseFloat(item.amount) * priceFeed).toFixed(2)} USD
                    </h1>
                  )}
                </div>
                <div className="w-[570px] mx-auto">
                  <h3 className="text-2xl leading-9 text-center">
                    {item.message}
                  </h3>
                </div>
              </div>
            </ShaodowBoxDiv>
          );
      })}
    </>
  );
}
