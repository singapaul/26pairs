import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { IoIosStats } from "react-icons/io";
import ListItem from "../ListItem";
import PopupContent from "../PopupContent";

export type StatsPopupProps = {
  show?: boolean;
  onClose?: () => void;
};

const StatsPopup = ({ show, onClose }: StatsPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [averageMoves, setAverageMoves] = useState(0);
  const [averageTime, setaverageTime] = useState("0");
  const [bestTime, setBestTime] = useState(0);
  const [bestMoves, setBestMoves] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // @ts-ignore
  };

  const getGameStats = () => {
    const val = localStorage.getItem("scoreHistory");
    if (val == null) {
      setGamesPlayed(0);
      setAverageMoves(0);
      setaverageTime("0");
      return;
    }
    const gameCount = JSON.parse(val);
    let totalTime = 0;
    let totalMoves = 0;
    for (var i = 0; i < gameCount.length; i++) {
      totalMoves += Number(gameCount[i].moves);
      totalTime += Number(gameCount[i].time);
    }
    setGamesPlayed(gameCount.length);
    setAverageMoves(Math.round(totalMoves / gameCount.length));
    // convert the time into a string
    const avgTime = totalTime / gameCount.length;
    // Minutes calculation
    const minutes = Math.floor((avgTime % 360000) / 6000).toString();
    // Seconds calculation
    const seconds = Math.floor((avgTime % 6000) / 100).toString();

    const finTime = `${minutes}:${seconds}`;
    setaverageTime(finTime);
  };

  const getBestTime = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("bestTime") == null) {
        console.log("no value");
      } else {
        // @ts-ignore
        setBestTime(localStorage.getItem("bestTime"));
        // @todo will need to convert format later
      }
    }
  };

  const getBestMoves = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("bestMoves") == null) {
        console.log("no value");
      } else {
        // @ts-ignore
        setBestMoves(localStorage.getItem("bestMoves"));
        // @todo will need to convert format later
      }
    }
  };


  useEffect(() => {
    getGameStats();
    getBestTime();
    getBestMoves();
  }, [show]);

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button className="p-2 rounded-full" onClick={toggleMenu}>
          <p className="text-4xl">
            <IoIosStats />
          </p>
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            {/* The overlay */}
            <div
              onClick={toggleMenu}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            {/* The menu */}
            <PopupContent title={"Stats"} onClose={toggleMenu}>
              <ul className="">
                <ListItem
                  variant={"stat"}
                  title={"Best Moves"}
                  // @ts-ignore
                  stat={bestMoves}
                />
                <ListItem
                  variant={"stat"}
                  title={"Best Time"}
                  stat={bestTime}
                />
                <ListItem
                  variant={"stat"}
                  title={"Games Played"}
                  stat={gamesPlayed}
                />
                <ListItem
                  variant={"stat"}
                  title={"Average time"}
                  stat={averageTime}
                />
                <ListItem
                  variant={"stat"}
                  title={"Average moves"}
                  stat={averageMoves}
                />
                <li className="text-xs text-neutral-500 pt-1">
                  2023 26Pairs ltd
                </li>
              </ul>
            </PopupContent>
          </div>
        )}
      </div>
    </>
  );
};

export default StatsPopup;
