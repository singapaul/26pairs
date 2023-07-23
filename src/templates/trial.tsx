import { HeadFC, graphql } from "gatsby";
import React from "react";
import Game from "../components/Game";
import { useEffect } from "react";
// import useDarkMode from "use-dark-mode";

// @ts-ignore
const WordPage = ({ data }: any) => {
  const { contentfulDeck } = data;
  // const darkmode = useDarkMode(true);

  // useEffect(() => {
    
  //   const root = window.document.documentElement;
  //   const docBody = window.document.body;
  //   if (darkmode.value == true) {
  //     // root.classList.remove("light");
  //     root.classList.add("dark");
  //     docBody.classList.add("dark")
  //   } else if (darkmode.value == false) {
  //     root.classList.remove("dark");
  //     docBody.classList.remove("dark")
  //     // root.classList.add("light");
  //   }
  // });

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
