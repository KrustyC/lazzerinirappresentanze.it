import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Markdown } from "../components/Markdown"
import { Parallax } from "../components/Parallax"
import { CenteredColumn } from "../components/CenteredColumn"
import { Employees } from "../components/Employees"
import SEO from "../components/seo"

const PageContainer = styled.div`
  margin-bottom: 100px;

  h1 {
    @media (max-width: 728px) {
      font-size: 28px;
    }
  }
`

const IndexPage = ({ data }) => {
  const {
    introduction,
    ourHistory1,
    ourHistory2,
  } = data.markdownRemark.frontmatter

  return (
    <>
      <SEO title="Azienda" />

      <PageContainer>
        <CenteredColumn>
          <Markdown md={introduction} />
        </CenteredColumn>

        <Employees />

        <CenteredColumn>
          <h1>La nostra storia</h1>
          <Markdown md={ourHistory1} />
        </CenteredColumn>

        <Parallax />

        <CenteredColumn>
          <Markdown md={ourHistory2} />
        </CenteredColumn>
      </PageContainer>
    </>
  )
}

export const pageQuery = graphql`
  query GetHome {
    markdownRemark(fileAbsolutePath: { regex: "/home/" }) {
      frontmatter {
        title
        introduction
        ourHistory1
        ourHistory2
      }
    }
  }
`

export default IndexPage
