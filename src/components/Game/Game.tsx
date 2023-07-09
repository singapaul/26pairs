import React from "react";
import { useEffect, useState, useRef } from "react";
import Header from "../Header";
import Card from "../Card";
import Gameboard from "../Gameboard";
import Timer from "../Timer";
import Layout from "../Layout";
// @ts-ignore
import { shuffle } from "../../utils/shuffle";
// @ts-ignore
import { mainCardsLite } from "../../data/Simpsonslite";
// @ts-ignore
import { mainCards } from "../../data/Simpsons";

export type GameProps = {
  version: "classic" | "lite";
  deck: any;
};

const Game = ({ version, deck }: GameProps) => {
  const initValBestScore = () => {
    // if (typeof window !== "undefined") {
    //   // @ts-ignore
    //   JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY;
    //   return;
    // } else {
    //   return 0;
    // }
  };

  useEffect(() => {
    if (version === "classic") {
      setCards(shuffle(deck.concat(deck)));
    } else if (version === "lite") {
      setCards(shuffle(mainCardsLite.concat(mainCardsLite)));
    }
  }, [deck]);

  const [cards, setCards] = useState();
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [bestScore, setBestScore] = useState(initValBestScore());

  const timeout = useRef(null);

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
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setIsPause(false);
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    stopTimer();
    reset();
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffle(cards));
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === deck.length) {
      setShowModal(true);
      stopTimer();
      setIsRunning(false);
      setIsPause(true);
      alert("Placeholder: game completed");
      // @ts-ignore
      const highScore = Math.min(moves, bestScore);
      // setBestScore(highScore);
      // ts-ignore
      if (typeof window !== "undefined") {
        // @ts-ignore
        localStorage.setItem("bestScore", highScore.toString());
      }
    }
  };

  const evaluate = () => {
    // Each time a second card is selected this function is called from a useEffect
    const [first, second] = openCards;
    enable();
    // @ts-ignore
    if (cards[first].type === cards[second].type) {
      // @ts-ignore
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
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

  return (
    <Layout>
      <Header restart={handleRestart} variant="game">
        <Timer
          isRunning={isRunning}
          moves={moves}
          resetTime={resetTime}
          isPause={isPause}
        />
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
              />
            );
          })}
      </Gameboard>
    </Layout>
  );
};

export default Game;
