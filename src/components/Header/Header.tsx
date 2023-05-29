import React from "react";
import { ReactNode } from "react";

export type HeaderProps = {
  children: ReactNode;
  variant: "game" | "menu";
};

const Header = ({ children, variant }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center container border-solid border-2 bg-sky-500 text-white border-sky-500 h-24">
      {children}
    </div>
  );
};

export default Header;
