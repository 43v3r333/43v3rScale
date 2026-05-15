import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { WalletContext } from "@/components/WalletContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "43v3rScale Dashboard",
  description: "AI Data Engine Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletContext>
          <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 text-slate-900 overflow-y-auto max-h-screen">
              {children}
            </main>
          </div>
        </WalletContext>
      </body>
    </html>
  );
}
