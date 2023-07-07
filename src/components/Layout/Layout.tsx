import React from "react";
import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="Layout flex flex-col h-screen w-full items-center">
      {children}
    </div>
  );
};

export default Layout;
