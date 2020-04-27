import React from "react"
import { graphql } from "gatsby"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1>Ciao</h1>
    <p>Lazzerini Rappresentanze.</p>

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </>
)

export const pageQuery = graphql`
  query GetHome {
    markdownRemark(fileAbsolutePath: { regex: "/home/" }) {
      frontmatter {
        title
      }
    }
  }
`

export default IndexPage
