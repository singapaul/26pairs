import React from "react";
import { ReactNode } from "react";

export type CardProps = {
  children?: ReactNode;
};

// @to-do pass the card a prop telling the component if you're playing classic (52) or premier league version (24)

const Card = ({ children }: CardProps) => {
  return (
    <div className="border-solid border-2 border-black bg-sky-500 h-12 w-12">
      {children}
    </div>
  );
};

export default Card;
