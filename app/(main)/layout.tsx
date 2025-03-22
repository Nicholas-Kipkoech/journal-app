import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Journal App - Dashboard",
  description: "",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto container">{children}</div>;
};

export default DashboardLayout;
