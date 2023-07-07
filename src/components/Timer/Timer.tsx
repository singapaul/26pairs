import React, { useEffect, useState } from "react";

export type TimerProps = {
  moves: number;
  isRunning: boolean;
  resetTime: boolean;
  isPause: boolean;
};

const Timer = ({ moves = 0, isRunning, resetTime, isPause }: TimerProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // @ts-ignore
    let intervalId;
    if (isRunning && !isPause) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }

    // @ts-ignore
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  useEffect(() => {
    setTime(0);
  }, [resetTime, isRunning]);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);
  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);
  // Milliseconds calculation
  const milliseconds = time % 100;

  return (
    <div className="flex w-fit gap-6 border-4 border-indigo-600">
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
