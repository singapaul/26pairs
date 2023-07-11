import React from "react";
import { useState, useRef } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export type TadaPopupProps = {
  show: boolean;
  time: number;
  moves: number;
  handleRestart: () => void;
};

const TadaPopup = ({ show, time, moves, handleRestart }: TadaPopupProps) => {
  return (
    <>
      <div className="relative">
        {show && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* The overlay */}
            <div
              onClick={() => {
               
              }}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            {/* The menu */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-48 py-2 rounded-md shadow-lg transition-transform duration-300 w-80 text-black flex flex-col p-4 text-left">
              <button className="self-end" onClick={()=> {}}>
                X
              </button>
              <p>
               Well done you beat the game
              </p>
              <button onClick={handleRestart}>Restart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TadaPopup;
