"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";

const getInter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className={`${getInter.className} antialiased`}>
        <Toaster richColors position="top-right" />
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
