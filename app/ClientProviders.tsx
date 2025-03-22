"use client";

import { Toaster } from "sonner";
import Header from "@/components/header";
import { AuthProvider } from "./context/AuthContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <Header />
      {children}
    </AuthProvider>
  );
}
