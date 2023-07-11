import { HeadFC, graphql } from "gatsby";
import React from "react";
import Game from "../components/Game";

// @ts-ignore
const WordPage = ({ data }: any) => {
  const { contentfulDeck } = data;

  return (
    <main>
      <Game
        version={"classic"}
        deck={contentfulDeck.cards}
        cardBack={contentfulDeck.backImage.url}
      />
    </main>
  );
};

export default WordPage;

export const Head: HeadFC = () => <title>26 Pairs</title>;

export const query = graphql`
  query thisCouldBeAnyText($id: String!) {
    contentfulDeck(contentful_id: { eq: $id }) {
      title
      backImage {
        url
      }
      cards {
        title
        id
        image {
          url
        }
      }
    }
  }
`;
