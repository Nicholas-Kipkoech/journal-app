"use client";
import React from "react";
import { JournalProvider } from "../context/JournalContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <JournalProvider>
      <div className="mx-auto container">{children}</div>;
    </JournalProvider>
  );
};

export default DashboardLayout;
