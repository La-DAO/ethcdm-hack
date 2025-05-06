'use client';

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@walletconnect/ethereum-provider').then(
        ({ default: WalletConnectProvider }) => {
          const provider = new WalletConnectProvider();
        }
      );
    }
  }, []);

  if (!ready) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-[#7f3e0c]">
      <div className="flex flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Column with Image */}
        <div className="w-1/2">
          <img
            src="/Tequio cover.png"
            alt="Tequio"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right Column with Text and Button */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido a Tequio
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Tequio es una plataforma de tandas onchain. Esta dapp esta
            actualmente en desarrollo. Para conectar tu wallet, introduce tu
            email o conecta tu wallet directamente.
          </p>
          <button
            onClick={login}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg"
          >
            Únete
          </button>
        </div>
      </div>
    </div>
  );
}
