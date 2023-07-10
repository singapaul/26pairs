import React from "react";

export type PopupContentProps = {
  children: any;
  title: string;
  onClose?: () => void;
};

const PopupContent = ({ children, title, onClose }: PopupContentProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-80 md:w-96 rounded-md shadow-lg transition-transform duration-300 flex flex-col text-black p-4">
      <div className="flex justify-between pb-4">
        <h2 className="text-2xl">{title}</h2>
        <button onClick={onClose}>X</button>
      </div>
      {children}
    </div>
  );
};

export default PopupContent;
