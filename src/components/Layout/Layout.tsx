import React from "react";
import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full justify-between">
      {children}
    </div>
  );
};

export default Layout;
