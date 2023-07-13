import React from "react";
import Button from "../Button";
import PopupContent from "../PopupContent";

export type TadaPopupProps = {
  show: boolean;
  time: number;
  moves: number;
  handleRestart: () => void;
  closeTada: () => void;
};

const TadaPopup = ({ show, time, moves, handleRestart }: TadaPopupProps) => {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(
        `I completed 26Pairs!\nmoves:${moves}\ntime: ${time}`
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);
  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  return (
    <>
      <div className="relative">
        {show && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* The overlay */}
            <div
              onClick={() => {}}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            {/* The menu */}
            <PopupContent title={"Completed"}>
              <p>
                Well done you beat the game in {moves} moves and in {minutes}:
                {seconds}
              </p>
              <div className="flex justify-around pt-2">
                <Button
                  text={"Restart"}
                  variant="primary"
                  handleClick={handleRestart}
                />
                <Button
                  text={"Copy to clipboard"}
                  variant="secondary"
                  handleClick={copyContent}
                />
              </div>
            </PopupContent>
          </div>
        )}
      </div>
    </>
  );
};

export default TadaPopup;
