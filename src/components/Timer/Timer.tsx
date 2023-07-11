import React, { useEffect, useState } from "react";

export type TimerProps = {
  moves?: number;
  minutes?: any;
  seconds?: any;
};

const Timer = ({ moves = 0, minutes, seconds }: TimerProps) => {
  return (
    <div className="flex bg-neutral-500 gap-1 border-2 border-orange-50 rounded p-2 my-3">
      <div>
        <h2>Moves</h2>
        <p>{moves}</p>
      </div>
      <div className="flex flex-col items-end w-12">
        <h2>Time</h2>
        <p className="">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default Timer;
