import React from "react";

export type ButtonProps = {
  text: string;
  variant: "primary" | "secondary";
  handleClick: () => void;
};

const Button = ({ text, variant, handleClick }: ButtonProps) => {
  const primaryClasses =
    "border-2 border-green-800 rounded p-2 flex-1 m-2 hover:text-orange-50 hover:bg-green-800";
  const secondaryClasses =
    "border-2 border-neutral-800 rounded p-2 flex-1 m-2 hover:text-orange-50 hover:bg-neutral-800";
  return (
    <button
      className={variant == "primary" ? primaryClasses : secondaryClasses}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
