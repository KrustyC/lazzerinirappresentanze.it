import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const StyledLogo = styled(Img)`
  /* margin-top: 10px; */
  width: 200px !important;
  height: 160px !important;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "visual_identity_white_stage02.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <StyledLogo fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Logo
