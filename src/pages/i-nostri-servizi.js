import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Services = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title="I nostri servizi" />
      <h1>{title}</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetServices {
    markdownRemark(fileAbsolutePath: { regex: "/services/" }) {
      frontmatter {
        title
      }
    }
  }
`

export default Services
