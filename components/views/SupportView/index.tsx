"use client";
import React, { useState, useEffect } from "react";
import HeaderSection from "@/components/layouts/Header";
import ShadowBoxButton from "@/components/module/ShadowBoxButton";
import ShaodowBoxDiv from "@/components/module/ShadowBoxDiv";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Web3 from "web3";
import CONTRACT_ADDRESS from "@/components/contract/contract_address.json";
import CONTRACT_ABI from "@/components/contract/ABI.json";

const SupportView = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState<string>('0');
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          const contractInstance = new web3Instance.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );
          setContract(contractInstance);
          const balanceResult: string = await contractInstance.methods.getBalance().call({ from: accounts[0] });
          const totalIncomeResult: string = await contractInstance.methods.getTotalIncome().call({ from: accounts[0] });
          const balanceValue = web3Instance.utils.fromWei(balanceResult, 'ether');
          const totalIncomeValue = web3Instance.utils.fromWei(totalIncomeResult, 'ether');
          setBalance(parseFloat(balanceValue));
          setTotalIncome(parseFloat(totalIncomeValue));
          setAmountToWithdraw(balanceResult); // in wei for withdrawal
        } catch (error) {
          console.error('Error fetching contract data:', error);
        }
      } else {
        console.log('Provider ethereum not found');
      }
    };
    init();
  }, []);

  const handleWithdraw = async () => {
    if (!web3 || !contract) {
      console.error('Web3 or contract not ready');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.withdraw(amountToWithdraw).send({ from: accounts[0] });
      console.log('Withdrawal successful');
      // Update balance after withdrawal
      const balanceResult: string = await contract.methods.getBalance().call({ from: accounts[0] });
      const balanceValue = web3.utils.fromWei(balanceResult, 'ether');
      setBalance(parseFloat(balanceValue));
      setAmountToWithdraw(balanceResult); // update amountToWithdraw in wei
    } catch (error) {
      console.error('Error withdrawing funds:', error);
    }
  };

  if (!session.data?.user?.name) {
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <Link href="/dashboard"><HeaderSection /></Link>

      {/* main */}
      <main className="flex px-32 mt-10 justify-center items-center gap-10">
        {/* card 1 */}
        <div className="flex flex-col items-start w-max justify-center mt-7 gap-5">
          <ShadowBoxButton className="mx-auto w-[146px] h-[81px] bg-orange cursor-default">
            Cashout
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="296px"
            widht="532px"
            backgroundColor="#F4CD00"
          >
            <div className="px-6 py-3 flex flex-col gap-28">
              <h1 className="font-bold text-[64px] text-black leading-[96px]">
                <span className="text-black/75">{totalIncome}</span> AVAX
              </h1>
              <div className="">
                <h6 className="text-xl leading-7">Total overall income.</h6>
              </div>
            </div>
          </ShaodowBoxDiv>
        </div>

        {/* card 2 */}
        <div className="flex flex-col w-max items-end mt-7 gap-5">
          <ShadowBoxButton className="mx-auto w-[146px] h-[81px] cursor-default">
            {session.data?.user?.name}
          </ShadowBoxButton>
          <ShaodowBoxDiv
            height="296px"
            widht="532px"
            backgroundColor="#FFB5E6"
          >
            <div className="px-6 py-3 flex flex-col gap-4 ">
              <h1 className="font-bold text-[64px] text-black leading-[96px]">
                <span className="text-black/75">{balance}</span> AVAX
              </h1>
              <ShadowBoxButton onClick={handleWithdraw} className="bg-[#BDFF00] text-[20px] w-[129px] h-[56px]" >
                Withdraw
              </ShadowBoxButton>
              <div className="">
                <h6 className="text-xl leading-7 ">
                  The above figure is the total balance that is ready to be
                  disbursed.
                </h6>
              </div>
            </div>
          </ShaodowBoxDiv>
        </div>
      </main>
    </div>
  );
};

export default SupportView;
