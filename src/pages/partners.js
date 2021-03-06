import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { CenteredColumn } from "../components/CenteredColumn"
import { Markdown } from "../components/Markdown"

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  width: 80vw;
  margin: 100px auto;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 728px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const PartnerLink = styled.a`
  text-decoration: none;
  height: 200px;
  display: flex;
  justify-content: center;
`

const Partner = styled.img`
  height: 100%;
  width: 220px;
  object-fit: contain;
`

const Partners = ({ data }) => {
  const partners = data.allMarkdownRemark.edges.map(
    ({ node: { frontmatter } }) => frontmatter
  )

  const { title, body } = data.markdownRemark.frontmatter

  return (
    <>
      <SEO title="I nostri partner" />
      <CenteredColumn>
        <h1>{title}</h1>
        <Markdown md={body} />
      </CenteredColumn>
      <PartnersGrid>
        {partners.map(({ name, link, logo }) => (
          <PartnerLink href={link} target="_blank" rel="noopener noreferrer">
            <Partner src={logo} />
          </PartnerLink>
        ))}
      </PartnersGrid>
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
