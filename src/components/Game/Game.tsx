import React from "react";
import { useEffect, useState, useRef } from "react";
import Header from "../Header";
import Card from "../Card";
import Gameboard from "../Gameboard";
import Timer from "../Timer";
import Layout from "../Layout";
import TadaPopup from "../TadaPopup";
// @ts-ignore
import { shuffle } from "../../utils/shuffle";
// @ts-ignore
import useDarkMode from "use-dark-mode";

export type GameProps = {
  version: "classic" | "lite";
  deck: any;
  cardBack: any;
};

const Game = ({ version, deck, cardBack }: GameProps) => {
  const darky = useDarkMode(undefined, { classNameDark: "dark" });

  const initValBestMoves = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      JSON.parse(Number(localStorage.getItem("bestMoves"))) ||
        Number.POSITIVE_INFINITY;
    } else {
      return 0;
    }
  };

  const initValBestTime = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      JSON.parse(Number(localStorage.getItem("bestTime"))) ||
        Number.POSITIVE_INFINITY;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (version === "classic") {
      setCards(shuffle(deck.concat(deck)));
    } else if (version === "lite") {
      // update later
      setCards(shuffle(deck.concat(deck)));
    }
  }, [deck]);

  const gamesPlayed = () => {
    if (localStorage.getItem("scoreHistory") == null) {
      //
      setGamesPlayedStat(0);
      // return 0;
    }
    const datta = localStorage.getItem("scoreHistory");
    // @ts-ignore
    const fda = JSON.parse(datta);
    setGamesPlayedStat(fda.length);
    // return fda.length;
  };

  const [cards, setCards] = useState();
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [isPause, setIsPause] = useState(false);
  // const [bestScore, setBestScore] = useState(initValBestS());
  const [bestMoves, setBestMoves] = useState(initValBestMoves());
  const [bestTime, setBestTime] = useState(initValBestTime());
  const [time, setTime] = useState(0);
  // @todo update
  const [showTada, setShowTada] = useState(false);
  const [gamesPlayedStat, setGamesPlayedStat] = useState(0);

  const timeout = useRef(null);

  const completedGamePrompt = () => {
    setShowTada(true);
  };

  const closeTada = () => {
    setShowTada(false);
  };

  const startTimer = () => {
    setResetTime(false);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setResetTime(true);
  };

  // @ts-ignore
  const checkIsInactive = (card) => {
    // @ts-ignore
    return Boolean(clearedCards[card.id]);
  };

  const handleRestart = () => {
    setShowTada(false);
    setIsPause(false);
    setClearedCards({});
    setOpenCards([]);
    setMoves(0);
    stopTimer();
    reset();
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffle(cards));
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === deck.length) {
      setIsPause(true);
      completedGamePrompt();
      // @ts-ignore
      // setBestScore(highScore);
      // ts-ignore
      if (typeof window !== "undefined") {
        // Log the score from the current game
        logLatestStats();
        // Check moves and update local storage if needed
        checkMovesStorage();
        // Check time and update local storage if needed
        checkTimeStorage();
      }
    }
  };

  const checkMovesStorage = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("bestMoves") == null) {
        const initialiseValues = JSON.stringify(moves);
        localStorage.setItem("bestMoves", initialiseValues);
      } else {
        // get the current value, add to it and resave
        const val = localStorage.getItem("bestMoves");
        const valNumber = Number(val);
        if (valNumber > moves) {
          const newLow = JSON.stringify(moves);
          localStorage.setItem("bestMoves", newLow);
        }
      }
    }
  };

  const checkTimeStorage = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("bestTime") == null) {
        const initialiseValues = JSON.stringify(time);
        localStorage.setItem("bestTime", initialiseValues);
      } else {
        // get the current value, add to it and resave
        const val = localStorage.getItem("bestTime");
        const valNumber = Number(val);
        if (valNumber > time) {
          const newLow = JSON.stringify(time);
          localStorage.setItem("bestTime", newLow);
        }
      }
    }
  };

  const logLatestStats = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("scoreHistory") == null) {
        // Write new value
        const firstVal = [{ time: time.toString(), moves: moves.toString() }];
        const initialiseValues = JSON.stringify(firstVal);
        localStorage.setItem("scoreHistory", initialiseValues);
      } else {
        // get the current value, add to it and resave
        const val = localStorage.getItem("scoreHistory");
        const newScore = {
          time: time.toString(),
          moves: moves.toString(),
        };
        // @ts-ignore
        const valT = JSON.parse(val);
        valT.push(newScore);
        const updatedScores = JSON.stringify(valT);
        localStorage.setItem("scoreHistory", updatedScores);
      }
    }
  };

  const evaluate = () => {
    // Each time a second card is selected this function is called from a useEffect
    const [first, second] = openCards;
    enable();
    // @ts-ignore
    if (cards[first].id === cards[second].id) {
      // @ts-ignore
      setClearedCards((prev) => ({ ...prev, [cards[first].id]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    // @ts-ignore
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  // @ts-ignore
  const handleCardClick = (index) => {
    startTimer();

    if (openCards.length === 1) {
      // @ts-ignore
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      // @ts-ignore
      clearTimeout(timeout.current);
      // @ts-ignore
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    // @ts-ignore
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      // @ts-ignore
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  // @ts-ignore
  const checkIsFlipped = (index) => {
    // @ts-ignore
    return openCards.includes(index);
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

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
    <Layout>
      <Header restart={handleRestart} variant="game"></Header>
      <button onClick={darky.toggle}>{darky.value ? "Dark": "Light"}</button>
      <Gameboard>
        {cards &&
          // @ts-ignore
          cards.map((card: any, index: any) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
                version={version}
                cardBack={cardBack}
              />
            );
          })}
      </Gameboard>
      <TadaPopup
        show={showTada}
        time={time}
        moves={moves}
        handleRestart={handleRestart}
        closeTada={closeTada}
      />
    </Layout>
  );
};

export default Game;
