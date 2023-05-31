import { cards, suits } from "../data/Cards";
import { shuffle } from "./shuffle";

export const createDeck = () => {
  let deck = [];
  suits.forEach(function (suit) {
    cards.forEach(function (rank) {
      deck.push({ suit: suit, rank: rank, isFlipped: false, id: suit + rank });
    });
  });
  return shuffle(deck);
  //   return deck;
};
