import { useAccount, useWriteContract } from "wagmi";
import { tandaFactoryABI } from "../lib/constants";
import { useState } from "react";

export function useCreateTanda() {
  const { address } = useAccount();
  const {
    writeContract,
    isPending,
    isSuccess,
    isError,
    data: createTandaHash,
    error,
    status,
  } = useWriteContract();

  const createTanda = async () => {
    try {
      console.log("running hook...");
      console.log("Dirección conectada:", address);

      if (!address) {
        console.error("Wallet not connected");
        return;
      }

      await writeContract({
        abi: tandaFactoryABI,
        address: "0x7F080196962aD0c85f068b853AA3468Fd5D17Db7",
        functionName: "createTanda",
        args: ["0x82B9e52b26A2954E113F94Ff26647754d5a4247D", 100],
      });
      console.log("Transacción enviada");
    } catch (err) {
      console.error("Error creating Tanda:", err);
    }
  };

  return {
    createTanda,
    isPending,
    isSuccess,
    isError,
    error,
    createTandaHash,
    status,
  };
}
