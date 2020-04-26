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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: false,
        anonymize: true,
        // Defers execution of google analytics script after page load
        defer: false,
        cookieDomain: process.env.COOKIE_DOMAIN,
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
