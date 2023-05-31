import React from "react";

export type TimerProps = {
  moves: number;
  time: number;
};

const Timer = ({ moves = 0, time = 0 }: TimerProps) => {
  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);
  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);
  // Milliseconds calculation
  const milliseconds = time % 100;

  return (
    <div className="flex w-fit gap-6 justify-between bg-indigo-700 py-2 px-6 rounded-2xl">
      <div>
        <h2>Moves</h2>
        <p>{moves}</p>
      </div>
      <div>
        <h2>Time</h2>
        <p>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default Timer;
