import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Game from "../components/Game";
// @ts-ignore
import { mainCardsLite } from "../data/Simpsonslite";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Game version="classic" deck={(mainCardsLite)} cardBack={undefined} />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>26 Pairs</title>;
