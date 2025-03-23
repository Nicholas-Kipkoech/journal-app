import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Journal App - Reflect on your life",
  description: "Senior engineer interview",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientProviders>
          <main className="max-h-screen">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
