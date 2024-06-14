"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth/index";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");

  const [repayToken, setRepayToken] = useState("");

  const { data: yourContract } = useScaffoldContract({
    contractName: "YourContract",
  });

  console.log("YourContract", yourContract);

  const { writeAsync: requestLoanWriteAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "requestLoan",
    args: [BigInt(inputOne), BigInt(inputTwo)],
  });

  const { writeAsync: repayLoanWriteAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "repayLoan",
    args: [BigInt(repayToken)],
  });

  const handleRequestLoan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputOne && inputTwo) {
      try {
        await requestLoanWriteAsync({ args: [BigInt(inputOne), BigInt(inputTwo)] });
      } catch (error) {
        console.error("Error submitting amounts", error);
      }
    } else {
      console.log("No amount submitted");
    }
  }

  const handleRepayLoan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputOne && inputTwo) {
      try {
        await repayLoanWriteAsync({ args: [BigInt(repayToken)] });
      } catch (error) {
        console.error("Error submitting amounts", error);
      }
    } else {
      console.log("No amount submitted");
    }
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Welcome to Conflux CDP{" "}
            </span>
          </h1>
        </div>

        {/* Sample App on Conflux */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="px-5">
            <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
              <h1 style={{ fontSize: "2rem" }}>Conflux CDP</h1>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Connected Address:</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", paddingBottom: "10px" }}>
              <Address address={connectedAddress} format="short" size="2xl" />
              <Balance address={connectedAddress} />
            </div>
            <h1 className="text-center text-lg">Want to borrow our HRS tokens?</h1>
          </div>
        </div>
        
      <form onSubmit={handleRequestLoan} style={{ display: "flex", flexDirection: "column" }}>
      <div className=" flex flex-col justify-center items-center p-10 gap-10 ">
        <p className=" text-black text-3xl ">Requesting loan</p>
        <span className="text-sm">
          (5% interest rate, 150% collateralization ratio)
        </span>
        <div className=" border-[1px] border-gray-400 shadow-inner rounded-xl flex flex-col justify-center items-center p-10 gap-5">
          <div className=" flex-col flex gap-2">
            <label htmlFor="">Tokens to be borrowed</label>
            <form className="max-w-sm mx-auto">
              <div className="flex">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="US">STA</option>

                </select>
                <input
                  id="states"
                  onChange={(e) => setInputOne(e.target.value)}
                  placeholder="Type token amount"
                  className="bg-gray-50 border w-[50vw] border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
            </form>
          </div>
          <div className=" flex-col flex gap-2">
            <label htmlFor="">Tokens to be collateralized</label>
            <form className="max-w-sm mx-auto">
              <div className="flex">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="US">COL</option>
                
                </select>
                <input
                  id="states"
                  onChange={(e) => setInputTwo(e.target.value)}
                  placeholder="Type token amount"
                  className="bg-gray-50 border w-[50vw] border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
            </form>
          </div>
          <button type="submit" className=" w-[30%] text-green-400 border-[1px] border-green-400 rounded-lg hover:text-white hover:bg-green-400 p-2">
            Claim Tokens
          </button>
        </div>
        </div>
        </form>
        
        <form onSubmit={handleRepayLoan} style={{ display: "flex", flexDirection: "column" }}>
      <div className=" flex flex-col justify-center items-center p-10 gap-10 ">
        <p className=" text-black text-3xl ">Repay loan</p>
        <div className=" border-[1px] border-gray-400 shadow-inner rounded-xl flex flex-col justify-center items-center p-10 gap-5">
          <div className=" flex-col flex gap-2">
            <label htmlFor="">Pay back STA tokens here</label>
            <form className="max-w-sm mx-auto">
              <div className="flex">
                
                <input
                  id="states"
                  onChange={(e) => setRepayToken(e.target.value)}
                  placeholder="Type token amount"
                  className="bg-gray-50 border w-[50vw] border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
            </form>
          </div>
          <button type="submit" className=" w-[30%] text-green-400 border-[1px] border-green-400 rounded-lg hover:text-white hover:bg-green-400 p-2">
            Repay tokens
          </button>
        </div>
        </div>
      </form>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
