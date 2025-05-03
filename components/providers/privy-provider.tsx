"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      // clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}
      config={{
        loginMethods: ["wallet", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#22c55e", // tailwind green-500
          logo: "https://pbs.twimg.com/profile_images/1634004075439357953/wrBuGLRJ_400x400.jpg",
        },
        // Create embedded wallets for users who don't have a wallet
        // embeddedWallets: {
        //   createOnLogin: 'users-without-wallets'
        // }
      }}
    >
      {children}
    </PrivyProvider>
  );
}
