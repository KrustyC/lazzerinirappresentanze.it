import React from "react"
import { graphql } from "gatsby"
import {Parallax} from "../components/Parallax"
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

    <CenteredColumn>
      <h1>La nostra storia</h1>
      <p>{outHistory1}</p>
    </CenteredColumn>

    <Parallax />

    <CenteredColumn>
      <p>{intro}</p>
    </CenteredColumn>


    <CenteredColumn>
      <h1>I nostri partner</h1>
    </CenteredColumn>


    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      
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
