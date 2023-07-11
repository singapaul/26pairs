import { HeadFC, Link, graphql } from "gatsby";
import React from "react";

// @ts-ignore
const WordPage = ({ data }: any) => {
  const { contentfulDeck } = data;
  

  return <div>{contentfulDeck.title}</div>;
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
        image {
          url
        }
      }
    }
  }
`;
