"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { JournalProvider } from "./context/JournalContext";

const getInter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className={`${getInter.className} antialiased`}>
        <JournalProvider>
          <AuthProvider>
            <Toaster richColors position="top-right" />
            <Header />
            <main className="min-h-screen">{children}</main>
          </AuthProvider>
        </JournalProvider>
      </body>
    </html>
  );
}
