import React from "react";
import { ReactNode } from "react";

export type CardProps = {
  children?: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="border-solid border-2 border-black bg-sky-500 h-8 w-8">
      {children}
    </div>
  );
};

export default Card;
