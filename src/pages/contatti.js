import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = ({ data }) => {
  const { title, address } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title="Contatti" />
      <h1>{title}</h1>
      <p>{address}</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetContacts {
    markdownRemark(fileAbsolutePath: { regex: "/contacts/" }) {
      frontmatter {
        title
        address
      }
    }
  }
`

export default Contact
