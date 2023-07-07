import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Game from "../components/Game";

// const pageStyles = {
//   color: "#232129",
//   fontFamily: "-apple-system, Roboto, sans-serif, serif",
//   height: "100vh",
// };

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Game version="classic" />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>26 Pairs</title>;
