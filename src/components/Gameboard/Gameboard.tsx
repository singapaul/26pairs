import React from "react";
import { ReactNode } from "react";

export type GameboardProps = {
  children?: ReactNode;
};

// @to-do pass the container a prop telling the component if you're playing classic (52) or premier league version (24)

const Gameboard = ({ children }: GameboardProps) => {
  return (
    <div className="grid grid-cols-6 gap-2 w-full justify-items-center items-center p-4">
      {children}
    </div>
  );
};

export default Gameboard;
