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
import { shuffle } from "../../utils/shuffle";
import MenuOverlay from "../MenuOverlay";
// @ts-ignore
import { mainCardsLite } from "../../data/Simpsonslite";
// @ts-ignore
import { mainCards } from "../../data/Simpsons";
import { setDefaultResultOrder } from "dns";
import { version } from "os";

export type GameProps = {
  version: "classic" | "lite";
};

const Game = ({ version }: GameProps) => {
  const initValBestScore = () => {
    console.log("the score");
    // if (typeof window !== "undefined") {
    //   // @ts-ignore
    //   JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY;
    //   return;
    // } else {
    //   return 0;
    // }
  };

  let uniqueElementsArray: any;
  if (version === "classic") {
    uniqueElementsArray = mainCards;
  } else if (version === "lite") {
    uniqueElementsArray = mainCardsLite;
  }

  const initCards = shuffle(uniqueElementsArray.concat(uniqueElementsArray));

  const [cards, setCards] = useState(initCards);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [bestScore, setBestScore] = useState(initValBestScore());

  const timeout = useRef(null);
  console.log(cards);
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
      console.log("Game Completed");
      setShowModal(true);
      stopTimer();
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
    console.log("evaluation function called");
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
    console.log("handleclick function called");
    startTimer();
    console.log("stuck here");
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
    console.log("1");
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
    console.log("2");
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

  // logic to handle open/close of the menu

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <Layout>
      <Header
        restart={handleRestart}
        variant="game"
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
      >
        <Timer isRunning={isRunning} moves={moves} resetTime={resetTime} />
      </Header>
      <MenuOverlay navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
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
              version={version}
            />
          );
        })}
      </Gameboard>
      <Footer navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
    </Layout>
  );
};

export default Game;
