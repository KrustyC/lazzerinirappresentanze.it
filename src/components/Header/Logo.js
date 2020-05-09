import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledLogo = styled(Img)`
  margin-top: 10px;
  width: 100px !important;
  height: 100px !important;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-short-b.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <StyledLogo fixed={data.placeholderImage.childImageSharp.fixed} />
}

export default Logo
