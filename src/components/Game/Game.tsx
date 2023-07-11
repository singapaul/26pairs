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

export type GameProps = {
  version: "classic" | "lite";
  deck: any;
  cardBack: any;
};

const Game = ({ version, deck, cardBack }: GameProps) => {
  const initValBestScore = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY;
      return;
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
  const [bestScore, setBestScore] = useState(initValBestScore());
  const [time, setTime] = useState(0);
  const [showTada, setShowTada] = useState(false);
  const [gamesPlayedStat, setGamesPlayedStat] = useState(0);

  const timeout = useRef(null);

  const completedGamePrompt = () => {
    setShowTada(true);
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
        // @ts-ignore
        // Save the game to the array
        localStorage.setItem("bestMoves", moves.toString());
        // Log the score from the current game
        logLatestStats();
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
        console.log(updatedScores);
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
      <Header restart={handleRestart} variant="game">
        <Timer moves={moves} minutes={minutes} seconds={seconds} />
      </Header>
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
        time={2}
        moves={moves}
        handleRestart={handleRestart}
      />
    </Layout>
  );
};

export default Game;
