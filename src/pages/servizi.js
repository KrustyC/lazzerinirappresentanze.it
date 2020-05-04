import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const Servizi = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter

  return (
    <>
      <SEO title="Servizi" />
      <h1>{title}</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </>
  )
}

export const pageQuery = graphql`
  query GetAbout {
    markdownRemark(fileAbsolutePath: { regex: "/services/" }) {
      frontmatter {
        title
      }
    }
  }
`

export default Servizi