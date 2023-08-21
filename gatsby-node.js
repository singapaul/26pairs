const path = require("path");

// @ts-ignore
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const data = await graphql(`
    query {
      allContentfulDeck {
        nodes {
          title
          slug
          contentful_id
          version
        }
      }
    }
  `);
  const decks = data.data.allContentfulDeck.nodes;
  const productTemplate = path.resolve("./src/templates/trial.tsx");
  // @ts-ignore
  decks.forEach((deck) => {
    createPage({
      path: `${deck.slug}/${deck.version}`,
      component: productTemplate,
      context: {
        id: deck.contentful_id,
      },
    });
  });
};
