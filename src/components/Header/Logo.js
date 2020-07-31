import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledLogo = styled(Img)`
  margin-top: 10px;
  width: 150px !important;
  height: 150px !important;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-all-black.png" }) {
        childImageSharp {
          fixed(width: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <StyledLogo fixed={data.placeholderImage.childImageSharp.fixed} />
}

export default Logo
