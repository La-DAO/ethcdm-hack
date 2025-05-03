"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TandasApp",
//   description: "",
// };

const PrivyAuthProvider = dynamic(
  () =>
    import("@/components/providers/privy-provider").then(
      (mod) => mod.PrivyAuthProvider
    ),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrivyAuthProvider>{children}</PrivyAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
