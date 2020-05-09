import React from "react"
import { graphql } from "gatsby"
// import Image from "../components/image"
import { CenteredColumn } from "../components/CenteredColumn"
import { Employees } from "../components/Employees"
import SEO from "../components/seo"

const title = "Chi Siamo"
const intro =
  "Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor "
const outHistory1 =
  "History 1 ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor "
const outHistory2 =
  "History 2 ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor "

const IndexPage = () => (
  <>
    <SEO title="Azienda" />
    <CenteredColumn>
      <h1>{title}</h1>
      <p>{intro}</p>
    </CenteredColumn>
    <Employees />

    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
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

// intro
// ourHistory1
// ourHistory2

export default IndexPage
