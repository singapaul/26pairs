import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import Game from "../components/Game";
// @ts-ignore
import { mainCardsLite } from "../data/Simpsonslite";

const IndexPage: React.FC<PageProps> = ({ data }) => {
  // @ts-ignore
  const { allContentfulDeck } = data;
  return (
    <main>
      <Game
        deckLinks={allContentfulDeck}
        version="classic"
        deck={mainCardsLite}
        cardBack={undefined}
      />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>26 Pairs</title>;

export const query = graphql`
  query thisCouldBeAnyText {
    allContentfulDeck {
      nodes {
        title
        slug
        contentful_id
        category
      }
    }
  }
`;
