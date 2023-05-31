import React from "react";

export type TimerProps = {
  moves?: number;
  time?: number;
};

const Timer = ({ moves = 12, time = 14 }: TimerProps) => {
  return (
    <div className="flex w-fit gap-6 justify-between bg-indigo-700 py-2 px-6 rounded-2xl">
      <div>
        <h2>Moves</h2>
        <p>{moves}</p>
      </div>
      <div>
        <h2>Time</h2>
        <p>{`00:00:${time}`}</p>
      </div>
    </div>
  );
};

export default Timer;
