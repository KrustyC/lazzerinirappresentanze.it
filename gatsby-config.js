require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Lazzerini Rappresentanze`,
    description: `Sito per Lazzerini Rappresentanze`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: "cookie-banner-portal",
        id: "cookie-banner-portal",
      },
    },
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: "initial-overlay-portal",
        id: "initial-overlay-portal",
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
        },
        environments: ["production", "development"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partners`,
        path: `${__dirname}/content/partners`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `site-pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lazzerini Rappresentanze`,
        short_name: `lazzerini`,
        start_url: `/`,
        background_color: `#24E16E`,
        theme_color: `#24E16E`,
        display: `minimal-ui`,
        icon: `src/images/logo-short-b.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
