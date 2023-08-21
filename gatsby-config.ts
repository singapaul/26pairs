import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `26Pairs`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "W8E-HjhDsGEOvAdcVgXQNy-FiO3X3ssEVgU0uIoyGyM",
        spaceId: "clau520o6xa1",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark",
      },
    },
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
    // "gatsby-plugin-google-gtag",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-omni-font-loader",
      options: {
        mode: "async",
        enableListener: true,
        preconnect: [
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
        ],
        web: [
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Staatliches",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Staatliches",
          },
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Roboto",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Roboto",
          },
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Playfair Display",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Playfair+Display",
          },
          {
            name: "Quattrocento",
            file: "https://fonts.googleapis.com/css2?family=Quattrocento&display=swap",
          },
          {
            name: "Home",
            file: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/assets/images/restart.png`
      },
    },
    "gatsby-plugin-offline",
  ],
};

export default config;
