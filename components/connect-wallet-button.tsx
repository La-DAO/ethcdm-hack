"use client";

import { useConnect, useAccount } from "wagmi";
import { metaMask } from "@wagmi/connectors";

export function ConnectWalletButton() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return <p>Conectado: {address}</p>;
  }

  return (
    <button
      onClick={() => connect({ connector: metaMask() })}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Conectar con Metamask
    </button>
  );
}
