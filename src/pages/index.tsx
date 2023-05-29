import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const pageStyles = {
  color: "#232129",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  height: "100vh",
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <Layout>
        <Header variant="game">
          <p>hello</p>
          <p>i'm the</p>
          <p>header</p>
        </Header>
        <Header variant="game">
          <p>hello</p>
          <p>hi</p>
          <p>szia</p>
        </Header>
        <Footer>
          <p>I AM </p>
          <p>The</p>
          <p>Footer</p>
        </Footer>
      </Layout>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Wage</title>;
