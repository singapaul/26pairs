import React from "react";
import { ReactNode } from "react";
import { useState, useEffect } from "react";
// @ts-ignore

export type PopupProps = {
  show: boolean;
  onClose: () => void;
};

const Popup = ({ show, onClose }: PopupProps) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="overlay bg-black opacity-80 absolute inset-0"></div>
        <div className="w-full dialog opacity-95 bg-white p-6 rounded-lg border-2 border-black">
          <div className="content">
            <p className="text-gray-800">
              This is the text content of the popup.
            </p>
          </div>
          <button
            className="close-button bg-gray-200 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
