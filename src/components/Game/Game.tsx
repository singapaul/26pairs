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

  const [cards, setCards] = useState();
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [bestScore, setBestScore] = useState(initValBestScore());
  const [showTada, setShowTada] = useState(false);

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

  const writeStorage = () => {
    localStorage.setItem("Best Moves", "2");
    localStorage.setItem("Best Time", "2");
    localStorage.setItem("Games Played", "2");
    const gamePlayed = [{ time: 2, moves: 43 }];
    const stringData = JSON.stringify(gamePlayed);
    localStorage.setItem("Record", stringData);
  };

  const getStorage = () => {
    console.log(localStorage.getItem("Best Moves"));
    // @ts-ignore
    console.log(JSON.parse(localStorage.getItem("Record")));
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
      <button onClick={writeStorage}>Write</button>
      <button onClick={getStorage}>Get</button>
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
