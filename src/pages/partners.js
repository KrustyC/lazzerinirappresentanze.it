import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { CenteredColumn } from "../components/CenteredColumn"
import { Markdown } from "../components/Markdown"

const PartnerLink = styled.a``

const Partner = styled.img``

const Partners = ({ data }) => {
  const partners = data.allMarkdownRemark.edges.map(
    ({ node: { frontmatter } }) => frontmatter
  )

  const { title } = data.markdownRemark.frontmatter

  return (
    <>
      <SEO title="I nostri partner" />
      <CenteredColumn>
        <h1>{title}</h1>
        {/* <Markdown md={} /> */}
        {partners.map(({ name, link, logo }) => (
          <p>{name}</p>
        ))}
      </CenteredColumn>
    </>
  )
}

export const pageQuery = graphql`
  query GetPartners {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/partners-data/" } }
    ) {
      edges {
        node {
          frontmatter {
            name
            link
            logo
          }
        }
      }
    }

    markdownRemark(fileAbsolutePath: { regex: "/partners/" }) {
      frontmatter {
        title
      }
    }
  }
`

export default Partners
