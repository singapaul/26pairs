import React from "react";
import { useEffect, useState, useRef } from "react";
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
import Popup from "../Popup";

export type GameProps = {
  version: "classic" | "lite";
};

const Game = ({ version }: GameProps) => {
  const initValBestScore = () => {
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
    uniqueElementsArray = mainCards.concat(mainCards);
  } else if (version === "lite") {
    uniqueElementsArray = mainCardsLite.concat(mainCardsLite);
  }

  const [cards, setCards] = useState(shuffle(uniqueElementsArray));
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
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
    setCards(shuffle(uniqueElementsArray));
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueElementsArray.length / 2) {
      setShowModal(true);
      // stopTimer();
      console.log("game completed");
      // setIsRunning(false);
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
    console.log("evaluation function called");
    // Each time a second card is selected this function is called from a useEffect
    const [first, second] = openCards;
    enable();

    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }

    console.log(Object.keys(clearedCards).length);
    console.log(uniqueElementsArray.length);
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

  // logic to handle open/close of the menu

  const [navbarOpen, setNavbarOpen] = useState(false);

  // Popup open close:

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Layout>
      <Header
        restart={handleRestart}
        variant="game"
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
      >
        <Timer
          isRunning={isRunning}
          moves={moves}
          resetTime={resetTime}
          isPause={isPause}
        />
      </Header>
      <MenuOverlay navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <Popup show={showPopup} onClose={handleClosePopup} />
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
      <button
        onClick={() => {
          setIsPause(!isPause);
        }}
      >
        Pause Game
      </button>
      <Footer
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        sharePopupOpen={showPopup}
        setSharePopupOpen={handleOpenPopup}
      />
    </Layout>
  );
};

export default Game;
