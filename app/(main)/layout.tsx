import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto container">{children}</div>;
};

export default DashboardLayout;
