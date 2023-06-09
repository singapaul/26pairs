import React from "react";
import { ReactNode } from "react";
import "./style.css";

export type GameboardProps = {
  children?: ReactNode;
};

// @to-do pass the container a prop telling the component if you're playing classic (52) or premier league version (24)

const Gameboard = ({ children }: GameboardProps) => {
  return (
    // grid grid-cols-6 gap-2
    <div className="flex flex-wrap justify-center h-full w-full gap-1 p-2">
      {children}
    </div>
  );
};

export default Gameboard;
