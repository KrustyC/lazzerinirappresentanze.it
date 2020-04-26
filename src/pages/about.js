import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Partner = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title="Chi Siamo" />
      <h1>{title}</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetAbout {
    markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
      frontmatter {
        title
      }
    }
  }
`

export default Partner