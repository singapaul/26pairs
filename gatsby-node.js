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
        }
      }
    }
  `);
  const decks = data.data.allContentfulDeck.nodes;
  const productTemplate = path.resolve("./src/templates/trial.tsx");
  // @ts-ignore
  decks.forEach((word) => {
    createPage({
      path: word.slug,
      component: productTemplate,
      context: {
        id: word.contentful_id,
      },
    });
  });
};
