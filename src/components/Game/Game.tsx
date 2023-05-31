import React from "react";
import { useEffect, useState, useRef } from "react";
import { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Card from "../Card";
import Gameboard from "../Gameboard";
import Timer from "../Timer";
import Layout from "../Layout";
// @ts-ignore
import { uniqueElementsArray } from "../../data/Simpsons";
// @ts-ignore
import { shuffle } from "../../utils/shuffle";

export type GameProps = {
  children?: ReactNode;
};

const Game = ({ children }: GameProps) => {
  const [cards, setCards] = useState(
    shuffle.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    // @ts-ignore
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );

  const timeout = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);
  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);
  // Milliseconds calculation
  const milliseconds = time % 100;

  // @ts-ignore
  const checkIsInactive = (card) => {
    // @ts-ignore
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    stopTimer();
    reset();
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffle(uniqueElementsArray.concat(uniqueElementsArray)));
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
      setShowModal(true);
      stopTimer();
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      // ts-ignore
      localStorage.setItem("bestScore", highScore.toString());
    }
  };

  const evaluate = () => {
    // Each time a second card is selected this function is called from a useEffect
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
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

  useEffect(() => {
    // @ts-ignore
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    // @ts-ignore
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  return (
    <Layout>
      <Header variant="game">
        <Timer />
      </Header>
      <Gameboard>
        {cards.map((card: any, index: any) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </Gameboard>
      <Footer>
        <p>I AM </p>
        <p>The</p>
        <p>Footer</p>
      </Footer>
    </Layout>
  );
};

export default Game;
