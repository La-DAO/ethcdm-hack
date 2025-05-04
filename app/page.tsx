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
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-row w-full max-w-4xl">
        {/* Columna izquierda con la imagen */}
        <div className="w-1/2 flex items-center justify-center h-full">
          <img
            src="/photo_2025-05-04_02-10-17.jpg"
            alt="Feriesilla"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Columna derecha con el botón e información adicional */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <button
            onClick={login}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Entrar a TandasApp
          </button>
          <p className="text-center text-gray-700">
            Bienvenido a TandasApp, la plataforma que te ayuda a gestionar tus
            finanzas de manera eficiente. Únete a nuestra comunidad y comienza a
            ahorrar hoy mismo.
          </p>
        </div>
      </div>
    </div>
  );
}
