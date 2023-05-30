import React from "react";
import { ReactNode } from "react";

export type FooterProps = {
  children: ReactNode;
};

const Footer = ({ children }: FooterProps) => {
  return (
    <div className="flex justify-between items-center border-solid border-2 border-red-500 bg-red-500 text-white min-h-20 h-24">
      {children}
    </div>
  );
};

export default Footer;
